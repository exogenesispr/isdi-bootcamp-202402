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
        // TO DO INPUT VALIDATION
        validateText(name, 'name')
        validateDate(birthdate, 'birthday')
        validateEmail(email, 'email')
        validateText(username, 'username', true)
        validatePassword(password, 'password')


        var user = data.findUser(function (user) {
            return user.email === email || user.username === username
        })

        if (user) throw new Error('user already exists')

        var user = {
            name: name,
            birthdate: birthdate,
            email: email,
            username: username,
            password: password,
            status: 'offline'
        }

        data.insertUser(user)
    }

    function loginUser(username, password) {
        validateText(username, 'username', true)
        validatePassword(password, 'password')

        var user = data.findUser(function (user) {
            return user.username === username && user.password === password
        })

        if (!user) {
            throw new Error('wrong credentials')
        }

        user.status = 'online'

        sessionStorage.userId = user.id
    }


    function retrieveUser() {
        var user = data.findUser(function (user) {
            return user.id === sessionStorage.userId
        })

        if (!user) {
            throw new Error('user not found')
        }

        return user
    }

    function logoutUser() {
        var user = data.findUser(function (user) {
            return user.id === sessionStorage.userId
        })

        if (!user) throw new Error('wrong credentials')

        user.status = 'offline'

        data.updateUser(user)
        delete sessionStorage.userId
    }

    function getLoggedInUserId() {
        return sessionStorage.userId
    }

    function isUserLoggedIn() {
        return !!sessionStorage.userId
    }

    function retrieveUsers() {
        var users = data.getAllUsers()

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

        data.insertPost(post)
    }

    function retrievePosts() {
        var posts = data.getAllPosts()

        posts.forEach(function (post) {
            var user = data.findUser(function (user) {
                return user.id === post.author
            })

            post.author = { id: user.id, username: user.username }
        })

        return posts.reverse()
    }

    function removePost(postId) {
        validateText(postId, 'postId')
        //TO DO INPUT VALIDATION

        var post = data.findPost(function (post) {
            return post.id === postId
        })

        if (!post) throw new Error('post not found')

        if (post.author.id !== getLoggedInUserId) throw new Error('post does not belong to user')

        data.deletePost(function (post) {
            return post.id === postId
        })
    }

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

        data.insertMessage(message)
    }

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
        createPost: createPost,
        retrievePosts: retrievePosts,
        removePost: removePost,
        createMessage: createMessage,
        showForm: showForm,
    }
})()