// business (logic)

var logic = (function () {
    function registerUser(name, birthdate, email, username, password) {
        // TO DO INPUT VALIDATION


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
        // TO DO INPUT VALIDATION 


        var user = data.findUser(function (user) {
            return user.username === username && user.password === password
        })

        if (!user) {
            throw new Error('wrong credentials')
        }

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
        sessionStorage.clear()
    }

    function getLoggedInUserId() {
        return sessionStorage.userId
    }

    function isUserLoggedIn() {
        return !!sessionStorage.userId
    }

    function createPost(image, text) {
        //TO DO INPUT VALIDATION

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

        return posts
    }

    function removePost(postId) {
        //TO DO INPUT VALIDATION

        var post = data.findPost(function (post) {
            return post.id === postId
        })

        if (!post) throw new Error('post not found')

        if (post.author.id !== data.getLoggedInUserId) throw new Error('post does not belong to user')

        data.deletePost(function (post) {
            return post.id === postId
        })
    }

    function showForm(id) {
        var form = document.getElementById(id)
        if (form.style.display === 'none') {
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
        createPost: createPost,
        retrievePosts: retrievePosts,
        removePost: removePost,
        showForm: showForm,
    }
})()