function registerUser(name, birthdate, email, username, password, callback) {
    validate.text(name, 'name')
    validate.date(birthdate, 'birthday')
    validate.email(email, 'email')
    validate.text(username, 'username', true)
    validate.password(password, 'password')
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            callback(null)
        }
    }

    xhr.open('POST', 'http://localhost:8080/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, birthdate, email, username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}

function loginUser(username, password, callback) {
    validate.text(username, 'username', true)
    validate.password(password, 'password')
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const userId = JSON.parse(json)

            sessionStorage.userId = userId

            callback(null)
        }
    }

    xhr.open('POST', 'http://localhost:8080/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}


function retrieveUser(callback) {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const user = JSON.parse(json)

            callback(null, user)
        }
    }

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}`)

    xhr.setRequestHeader('Authorization', sessionStorage.userId)

    xhr.send()
}

function logoutUser(callback) {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)
            const constructor = window[error]
            callback(new constructor(message))
        } else if (status >= 400) {
            callback(new Error('system error'))

            callback
        } else {
            delete sessionStorage.userId

            callback(null)
        }
    }

    /*
    const user = db.users.findOne(function (user) {
        return user.id === sessionStorage.userId
    })

    if (!user) throw new Error('wrong credentials')

    user.status = 'offline'

    db.users.updateOne(user)

    delete sessionStorage.userId
    */
}

function getLoggedInUserId() {
    return sessionStorage.userId
}

function isUserLoggedIn() {
    return !!sessionStorage.userId
}

function cleanUpLoggedInUserId() {
    delete sessionStorage.userId
}

function retrieveUsersWithStatus() {
    const users = db.users.getAll()

    const index = users.findIndex(function (user) {
        return user.id === sessionStorage.userId
    })

    users.splice(index, 1)

    users.forEach(function (user) {
        delete user.name
        delete user.email
        delete user.birthdate
        delete user.password
    })

    users.sort(function (a, b) {
        return a.username < b.username ? -1 : 1
    }).sort(function (a, b) {
        return a.status > b.status ? -1 : 1
    })

    return users
}

function sendMessageToUser(userId, text) {
    validate.text(userId, 'userId', true)
    validate.text(text, 'text')

    let chat = db.chats.findOne(function (chat) {
        return chat.users.includes(userId) && chat.users.includes(sessionStorage.userId)
    })

    if (!chat) {
        chat = {
            users: [userId, sessionStorage.userId],
            messages: []
        }
    }

    const message = {
        from: sessionStorage.userId,
        text: text,
        date: new Date().toISOString(),
    }

    chat.messages.push(message)

    if (!chat.id) {
        db.chats.insertOne(chat)
    } else {
        db.chats.updateOne(chat)
    }
}

function retrieveMessagesWithUser(userId) {
    validate.text(userId, 'userId', true)

    const chat = db.chats.findOne(function (chat) {
        return chat.users.includes(userId) && chat.users.includes(sessionStorage.userId)
    })

    if (chat) {
        return chat.messages
    } else {
        return []
    }
}

function createPost(image, text, callback) {
    validateUrl(image, 'image')
    if (text) {
        validate.text(text, 'text')
    }
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            callback(null)
        }
    }

    xhr.open('POST', 'http://localhost:8080/posts')

    xhr.setRequestHeader('Authorization', sessionStorage.userId)
    xhr.setRequestHeader('Content-type', 'application/json')

    const post = { image, text }

    const json = JSON.stringify(post)

    xhr.send(json)
}

function retrievePosts(callback) {
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) {
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const posts = JSON.parse(json)

            callback(null, posts.reverse())
        }
    }

    xhr.open('GET', 'http://localhost:8080/posts')

    xhr.setRequestHeader('Authorization', sessionStorage.userId)

    xhr.send()
}

function removePost(postId) {
    validate.text(postId, 'postId')

    const post = db.posts.findOne(function (post) {
        return post.id === postId
    })

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    db.posts.deleteOne(function (post) {
        return post.id === postId
    })
}

function modifyPost(postId, text) {
    validate.text(postId, 'postId', true)
    validate.text(text, 'text',)

    const post = db.posts.findOne(function (post) {
        return post.id === postId
    })

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    post.text = text

    db.posts.updateOne(post)
}

/* PREVIOUS MESSAGE FEATURE (NOW INCLUDED WITH CHATS)
function createMessage(userId, message2) {
    validate.text(message2, 'message')

    const timestamp = Date.now()
    const messageDate = new Date(timestamp).toISOString()

    const message = {
        from: getLoggedInUserId(),
        to: userId,
        text: message2,
        date: messageDate,
    }

    db.insertMessage(message)
}

function retrieveMessages(userIdFrom, userIdTo) {
    const messages = db.getAllMessages()

    const fromToMessages = messages.filter(function (message) {
        return message.from === userIdFrom && message.to === userIdTo
    })

    const toFromMessages = messages.filter(function (message) {
        return message.from === userIdTo && message.to === userIdFrom
    })

    const allMessages = fromToMessages.concat(toFromMessages)

    allMessages.sort(function (a, b) {
        return new Date(a.date) > new Date(b.date) ? -1 : 1
    })

    const formattedMessages = allMessages.map(function (message) {
        if (message.from === userIdFrom) {
            //cuidao con right y left (logica no sabe de presentacion)
            message.side = 'right'
        } else {
            message.side = 'left'
        }
        return message
    })

    return formattedMessages
}
*/
