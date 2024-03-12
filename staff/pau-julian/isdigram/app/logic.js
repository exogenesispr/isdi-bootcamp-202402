// business (logic)

var logic = (function () {
    // Constants
    var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
    var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
    var URL_REGEX = /^(http|https):\/\//

    // Helpers

    function validateText(text, explain, checkEmptySpaceInside) {
        if (typeof text !== 'string') throw new Error(explain + ' ' + ' is not a string')
        if (!text.trim().length) throw new Error(explain + ' >' + text + '< is empty or blank')

        if (checkEmptySpaceInside) {
            if (text.includes(' ')) throw new Error(explain + ' ' + text + ' has empty spaces')
        }
    }

    function validateDate(date, explain) {
        if (typeof date !== 'string') throw new TypeError(expalin + '' + date + ' is not a string')
        if (!DATE_REGEX.test(date)) throw new Error(explain + ' ' + date + ' is not a date')
    }

    function validateEmail(email, explain) {
        if (!EMAIL_REGEX.test(email)) throw new Error(explain + ' ' + email + ' is not an email')
    }

    function validatePassword(password, explain) {
        if (!PASSWORD_REGEX.test(password)) throw new Error(explain + ' ' + password + ' is not acceptable')
    }

    function validateUrl(url, explain) {
        if (!URL_REGEX.test(url)) throw new Error(explain + ' ' + url + ' is not an url')
    }

    // Logic

    function registerUser(name, birthdate, email, username, password) {
        validateText(name, 'name')
        validateDate(birthdate, 'birthday')
        validateEmail(email, 'email')
        validateText(username, 'username', true)
        validatePassword(password, 'password')


        var user = db.users.findOne(function (user) {
            return user.email === email || user.username === username
        })

        if (user) throw new Error('user already exists')

        var user = {
            name: name.trim(),
            birthdate: birthdate,
            email: email,
            username: username,
            password: password,
            status: 'offline'
        }

        db.users.insertOne(user)
    }

    function loginUser(username, password) {
        validateText(username, 'username', true)
        validatePassword(password, 'password')

        var user = db.users.findOne(function (user) {
            return user.username === username && user.password === password
        })

        if (!user) {
            throw new Error('wrong credentials')
        }

        user.status = 'online'

        db.users.updateOne(user)

        sessionStorage.userId = user.id
    }


    function retrieveUser() {
        var user = db.users.findOne(function (user) {
            return user.id === sessionStorage.userId
        })

        if (!user) {
            throw new Error('user not found')
        }

        return user
    }

    function logoutUser() {
        var user = db.users.findOne(function (user) {
            return user.id === sessionStorage.userId
        })

        if (!user) throw new Error('wrong credentials')

        user.status = 'offline'

        db.users.updateOne(user)

        delete sessionStorage.userId
    }

    function getLoggedInUserId() {
        return sessionStorage.userId
    }

    function isUserLoggedIn() {
        return !!sessionStorage.userId
    }

    function retrieveUsers() {
        var users = db.users.getAll()

        var index = users.findIndex(function (user) {
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
        validateText(userId, 'userId', true)
        validateText(text, 'text')

        var chat = db.chats.findOne(function (chat) {
            return chat.users.includes(userId) && chat.users.includes(sessionStorage.userId)
        })

        if (!chat) {
            chat = {
                users: [userId, sessionStorage.userId],
                messages: []
            }
        }

        var message = {
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
        validateText(userId, 'userId', true)

        var chat = db.chats.findOne(function (chat) {
            return chat.users.includes(userId) && chat.users.includes(sessionStorage.userId)
        })

        if (chat) {
            return chat.messages
        } else {
            return []
        }
    }

    function createPost(image, text) {
        validateUrl(image, 'image')
        if (text) {
            validateText(text, 'text')
        }

        var post = {
            author: sessionStorage.userId,
            image: image,
            text: text,
            date: new Date().toLocaleDateString('en-CA'),
        }

        db.posts.insertOne(post)
    }

    function retrievePosts() {
        var posts = db.posts.getAll()

        posts.forEach(function (post) {
            var user = db.users.findOne(function (user) {
                return user.id === post.author
            })

            post.author = { id: user.id, username: user.username }
        })

        return posts.reverse()
    }

    function removePost(postId) {
        validateText(postId, 'postId')
        //TO DO INPUT VALIDATION

        var post = db.posts.findOne(function (post) {
            return post.id === postId
        })

        if (!post) throw new Error('post not found')

        if (post.author.id !== sessionStorage.userId) throw new Error('post does not belong to user')

        db.posts.deleteOne(function (post) {
            return post.id === postId
        })
    }

    function modifyPost(postId, text) {
        validateText(postId, 'postId', true)
        validateText(text, 'text',)

        var post = db.posts.findOne(function (post) {
            return post.id === postId
        })

        if (!post) throw new Error('post not found')

        if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

        post.text = text

        db.posts.updateOne(post)
    }

    /*
    function createMessage(userId, message2) {
        validateText(message2, 'message')

        var timestamp = Date.now()
        var messageDate = new Date(timestamp).toISOString()

        var message = {
            from: getLoggedInUserId(),
            to: userId,
            text: message2,
            date: messageDate,
        }

        db.insertMessage(message)
    }

    function retrieveMessages(userIdFrom, userIdTo) {
        var messages = db.getAllMessages()

        var fromToMessages = messages.filter(function (message) {
            return message.from === userIdFrom && message.to === userIdTo
        })

        var toFromMessages = messages.filter(function (message) {
            return message.from === userIdTo && message.to === userIdFrom
        })

        var allMessages = fromToMessages.concat(toFromMessages)

        allMessages.sort(function (a, b) {
            return new Date(a.date) > new Date(b.date) ? -1 : 1
        })

        var formattedMessages = allMessages.map(function (message) {
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

    function showForm(id) {
        var form = document.getElementById(id)
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'block'
        } else {
            form.style.display = 'none'
        }
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        retrieveUser: retrieveUser,
        logoutUser: logoutUser,
        getLoggedInUserId: getLoggedInUserId,
        isUserLoggedIn: isUserLoggedIn,

        retrieveUsers: retrieveUsers,
        sendMessageToUser: sendMessageToUser,
        retrieveMessagesWithUser: retrieveMessagesWithUser,

        createPost: createPost,
        retrievePosts: retrievePosts,
        removePost: removePost,
        modifyPost: modifyPost,


        //createMessage: createMessage,
        //retrieveMessages: retrieveMessages,
        showForm: showForm,
    }
})()