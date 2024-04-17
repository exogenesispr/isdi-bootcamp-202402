function logoutUser() {

    delete sessionStorage.token

    /*

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

    
    const user = db.users.findOne(function (user) {
        return user.id === sessionStorage.userId
    })

    if (!user) throw new Error('wrong credentials')

    user.status = 'offline'

    db.users.updateOne(user)

    delete sessionStorage.userId
    */
}

export default logoutUser