import db from '../data/index.mjs'

// Constants
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const URL_REGEX = /^(http|https):\/\//

// Helpers

function validateText(text, explain, checkEmptySpaceInside) {
    if (typeof text !== 'string') throw new Error(explain + ' ' + ' is not a string')
    if (!text.trim().length) throw new Error(explain + ' >' + text + '< is empty or blank')

    if (checkEmptySpaceInside) {
        if (text.includes(' ')) throw new Error(explain + ' ' + text + ' has empty spaces')
    }
}

function validateDate(date, explain) {
    if (typeof date !== 'string') throw new TypeError(explain + '' + date + ' is not a string')
    if (!DATE_REGEX.test(date)) throw new Error(explain + ' ' + date + ' does not have a valid format')
}

function validateEmail(email, explain = 'email') {
    if (typeof email !== 'string') throw new TypeError(explain + '' + email + ' is not a email')
    if (!EMAIL_REGEX.test(email)) throw new Error(explain + ' ' + email + ' is not an email')
}

function validatePassword(password, explain = 'password') {
    if (!PASSWORD_REGEX.test(password)) throw new Error(explain + ' ' + password + ' is not acceptable')
}

function validateUrl(url, explain) {
    if (!URL_REGEX.test(url)) throw new Error(explain + ' ' + url + ' is not an url')
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

// Logic

function registerUser(name, birthdate, email, username, password, callback) {
    validateText(name, 'name')
    validateDate(birthdate, 'birthday')
    validateEmail(email, 'email')
    validateText(username, 'username', true)
    validatePassword(password, 'password')
    validateCallback(callback)

    db.users.findOne((user) => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (user) {
            callback(new Error('user already exists'))

            return
        }

        user = {
            name: name.trim(),
            birthdate: birthdate,
            email: email,
            username: username,
            password: password,
            status: 'offline',
        }

        db.users.insertOne(user, (error) => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

function loginUser(username, password, callback) {
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    db.users.findOne((user) => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (user.password !== password) {
            callback(new Error('wrong password'))

            return
        }

        user.status = 'online'

        db.users.updateOne((user2) => user2.id === user.id, user, (error) => {
            if (error) {
                callback(error)

                return
            }

            callback(null, user.id)
        })
    })
}

function retrieveUser(userId, callback) {
    validateText(userId, 'userId', true)
    validateCallback(callback)

    db.users.findOne((user) => user.id === userId, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        delete user.id
        delete user.password
        delete user.status

        callback(null, user)
    })
}

function logoutUser(userId, callback) {
    validateText(userId, 'userId', true)
    validateCallback(callback)

    db.users.findOne((user) => { user.id === userId }, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        user.status = 'offline'

        db.users.updateOne((user2) => user2.id === user.id, user, (error) => {
            if (error) {
                callback(error)

                return
            }

            userId = null

            callback(null)
        })
    })
}

//NEXT 3 FUNCTIONS USE SESSION STORAGE-(NO ASYNCHRONY)

function getLoggedInUserId() {
    return sessionStorage.userId
}

function isUserLoggedIn() {
    return !!sessionStorage.userId
}

function cleanUpLoggedInUserId() {
    delete sessionStorage.userId
}

// TILL HERE

function retrieveUsersWithStatus(callback) {
    validateCallback(callback)

    db.users.getAll((error, users) => {
        if (error) {
            callback(error)

            return
        }

        const index = users.findIndex((user => user.id === sessionStorage.userId))

        users.splice(index, 1)

        users.forEach((user) => {
            delete user.name
            delete user.email
            delete user.password
            delete user.birthdate
        })

        users.sort((a, b) => {
            a.username < b.username ? -1 : 1
        }).sort((a, b) => {
            a.status > b.status ? -1 : 1
        })

        callback(null, users)
    })
}

function sendMessageToUser(userId, text, callback) {
    validateText(userId, 'userId', true)
    validateText(text, 'text')
    validateCallback(callback)

    db.chats.findOne((chat) => chat.users.includes(userId) && chat.users.includes(sessionStorage.userId), (error, chat) => {
        if (error) {
            callback(error)

            return
        }

        if (!chat) {
            chat = { users: [userId, sessionStorage.userId], messages: [] }
        }

        const message = { from: sessionStorage.userId, text: text, date: new Date().toISOString() }

        chat.messages.push(message)

        if (!chat.id) {
            db.chats.insertOne(chat, (error) => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        } else {
            db.chats.updateOne((chat2) => chat2.id === chat.id, chat, (error) => {
                if (error) {
                    callback(error)

                    return
                }
                callback(null)
            })
        }
    })
}

function retrieveMessagesWithUser(userId, callback) {
    validateText(userId, 'userId', true)
    validateCallback(callback)

    db.chats.findOne((chat) => chat.users.includes(userId) && chat.users.includes(sessionStorage.userId), (error, chat) => {
        if (error) {
            callback(error)

            return
        }

        if (chat) {
            callback(null, chat.messages)
            //nose si el return esta bien
            return
        } else {
            callback(null, [])

            return
        }
    })
}

function createPost(image, text, callback) {
    validateUrl(image, 'image')
    validateCallback(callback)

    if (text) {
        validateText(text, 'text')
    }

    const post = {
        author: sessionStorage.userId,
        image: image,
        text: text,
        date: new Date().toLocaleDateString('en-CA')
    }

    db.posts.insertOne(post, (error) => {
        if (error) {
            callback(error)

            return
        }

        callback(null)
    })
}

function retrievePosts(callback) {
    validateCallback(callback)

    db.posts.getAll((error, posts) => {
        if (error) {
            callback(error)

            return
        }

        posts.forEach((post) => {
            db.users.findOne((user) => user.id === post.author, (error) => {
                if (error) {
                    callback(error)

                    return
                }

                post.author = { id: user.id, username: user.username }
            })
        })

        callback(null, posts.reverse())
    })
}

function removePost(postId, callback) {
    validateText(postId, 'postId', true)
    validateCallback(callback)

    db.posts.findOne((post) => post.id === postId, (error) => {
        if (error) {
            callback(error)

            return
        }

        if (!post) {
            callback(new Error('post not found'))

            return
        }

        if (post.author !== sessionStorage.userId) {
            callback(new Error('post does not belong to user'))

            return
        }

        db.posts.deleteOne((post) => post.id === postId, (error) => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

function modifyPost(postId, text, callback) {
    validateText(postId, 'postId', true)
    validateText(text, 'text')
    validateCallback(callback)

    db.posts.findOne((post) => post.id === postId, (error, post) => {
        if (error) {
            callback(error)

            return
        }

        if (!post) {
            callback(new Error('post not found'))

            return
        }

        if (post.author !== sessionStorage.userId) {
            callback(new Error('post does not belong to user'))

            return
        }

        post.text = text

        db.posts.updateOne((post2) => post2.id === post.id, post, (error) => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    retrieveUsersWithStatus,

    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,

    sendMessageToUser,
    retrieveMessagesWithUser,

    createPost,
    retrievePosts,
    removePost,
    modifyPost,


}

export default logic