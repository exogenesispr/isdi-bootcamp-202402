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
    validate.callback(callback)

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
    validate.text(userId, 'userId', true)
    validate.text(text, 'text')
    validate.callback(callback)

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
    validate.text(userId, 'userId', true)
    validate.callback(callback)

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