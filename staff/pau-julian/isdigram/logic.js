// business (logic)

var logic = (function () {
    function registerUser(name, birthdate, email, username, password) {
        var user = data.findUser(function (user) {
            return user.email === email || user.username === username
        })

        if (user) throw new Error('user already exists')

        var user = {
            name: name,
            birthdate: birthdate,
            email: email,
            username: username,
            password: password
        }

        data.insertUser(user)
    }

    function loginUser(username, password) {
        var user = data.findUser(function (user) {
            return user.username === username && user.password === password
        })

        if (!user) {
            throw new Error('wrong credentials')
        }

        sessionStorage.username = username
    }


    function retrieveUser() {
        var user = data.findUser(function (user) {
            return user.username === sessionStorage.username
        })

        if (!user) {
            throw new Error('user not found')
        }

        return user
    }

    function logoutUser() {
        sessionStorage.clear()
    }

    function createPost(image, text) {
        var post = {
            author: sessionStorage.username,
            image: image,
            text: text,
            date: new Date().toLocaleDateString('en-CA')
        }

        data.insertPost(post)
    }

    function showForm(id) {
        var form = document.getElementById(id)
        if (form.style.display === 'none') {
            form.style.display = 'block'
        } else {
            form.style.display = 'none'
        }
    }

    function retrievePosts() {
        var posts = data.getAllPosts()

        return posts
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        retrieveUser: retrieveUser,
        logoutUser: logoutUser,
        createPost: createPost,
        showForm: showForm,
        retrievePosts: retrievePosts,
    }
})()