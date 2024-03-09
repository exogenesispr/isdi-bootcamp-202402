// presentation

(function () {
    if (!logic.isUserLoggedIn()) {
        location.href = '../login'

        return
    }

    var title = document.querySelector('h1')
    var logoutButton = document.querySelector('#logoutbutton')
    var showCreatePostFormButton = document.querySelector('#show-create-post-form-button')
    var createPostForm = document.querySelector('#create-post-form')
    var postListSection = document.querySelector('#post-list-section')
    var createPostSection = document.querySelector('#create-post-section')
    var chatButton = document.querySelector('#chat-button')
    var chatSection = document.querySelector('#chat-section')
    var footer = document.querySelector('#footer')
    var homeButton = document.querySelector('#home-button')
    var backButton = document.querySelector('#back-button')
    var userList = document.querySelector('#user-list')
    var messageSection = document.querySelector('#message-section')
    var sendMessageForm = messageSection.querySelector('#send-message-form')

    try {
        var user = logic.retrieveUser()

        title.innerText = 'Welcome, ' + user.name + '!'
    } catch (error) {
        console.error(error)

        alert(error.message)
    }

    logoutButton.addEventListener('click', function () {
        logic.logoutUser()

        location.href = '../login'
    })

    showCreatePostFormButton.addEventListener('click', function () {
        logic.showForm('create-post-section')
    })

    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault()

        var imageInput = document.getElementById('createpost-image')
        var image = imageInput.value

        var textInput = document.getElementById('createpost-text')
        var text = textInput.value

        try {
            logic.createPost(image, text)

            createPostForm.reset()

            logic.showForm('create-post-section')

            renderPosts()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    })

    function renderPosts() {
        try {
            var posts = logic.retrievePosts()

            postListSection.innerHTML = ''

            posts.forEach(function (post) {
                var article = document.createElement('article')

                var authorHeading = document.createElement('h3')
                authorHeading.innerText = post.author.username

                var image = document.createElement('img')
                image.src = post.image

                var paragraph = document.createElement('p')
                paragraph.innerText = post.text

                var dateTime = document.createElement('time')
                dateTime.innerText = post.date

                article.append(authorHeading, image, paragraph, dateTime)

                if (post.author.id === logic.getLoggedInUserId()) {
                    var deleteButton = document.createElement('button')
                    deleteButton.setAttribute('id', 'button-delete-post')
                    deleteButton.innerText = 'Delete🗑Post'

                    deleteButton.addEventListener('click', function () {
                        if (confirm('delete post?')) {
                            try {
                                logic.removePost(post.id)

                                renderPosts()
                            } catch (error) {
                                console.error(error)

                                alert(error.message)
                            }
                        }
                    })

                    article.appendChild(deleteButton)
                }


                //if (deleteButton) {
                //    article.appendChild(deleteButton)
                //}

                postListSection.appendChild(article)
            })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    renderPosts()

    chatButton.addEventListener('click', function () {
        postListSection.style.display = 'none'
        footer.style.display = 'none'
        chatButton.style.display = 'none'

        homeButton.style.display = 'block'
        chatSection.style.display = 'block'

        try {
            renderUsers()

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    })

    function renderUsers() {
        userList.innerHTML = ''

        var users = logic.retrieveUsers()

        users.forEach(function (user) {
            var item = document.createElement('li')

            if (user.status === 'online')
                item.classList.add('user-list__item--online')
            else if (user.status === 'offline')
                item.classList.add('user-list__item--offline')

            item.innerText = user.username

            item.addEventListener('click', function () {
                showMessageConversation(user.id)
            })

            userList.appendChild(item)
        })
    }

    function showMessageConversation(userId) {
        chatSection.style.display = 'none'
        backButton.style.display = 'block'
        homeButton.style.display = 'none'
        messageSection.style.display = 'inline'

        sendMessageForm.addEventListener('submit', function (event) {
            event.preventDefault()

            var messageInput = sendMessageForm.querySelector('#message')
            var message = messageInput.value

            try {
                logic.createMessage(userId, message)

                sendMessageForm.reset()

            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        })
    }

    homeButton.addEventListener('click', function () {
        homeButton.style.display = 'none'
        chatSection.style.display = 'none'

        postListSection.style.display = ''
        footer.style.display = ''
        chatButton.style.display = ''
    })

    backButton.addEventListener('click', function () {
        backButton.style.display = 'none'

        chatSection.style.display = 'block'
        homeButton.style.display = 'block'
        messageSection.style.display = ''
        try {
            renderUsers()

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    })

})()
