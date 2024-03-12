// presentation

(function () {
    if (!logic.isUserLoggedIn()) {
        location.href = '../login'

        return
    }

    var title = document.querySelector('h1')
    var logoutButton = document.querySelector('#logoutbutton')
    var createPostSection = document.querySelector('#create-post-section')
    var createPostForm = document.querySelector('#create-post-form')
    var createPostCancelButton = createPostSection.querySelector('#create-post-cancel-button')
    var showCreatePostFormButton = document.querySelector('#show-create-post-form-button')
    var postListSection = document.querySelector('#post-list-section')

    var chatButton = document.querySelector('#chat-button')
    var chatSection = document.querySelector('#chat-section')
    var chatPanel = chatSection.querySelector('#chat-panel')
    var chatForm = chatPanel.querySelector('form')
    var footer = document.querySelector('#footer')
    var homeButton = document.querySelector('#home-button')
    var backButton = document.querySelector('#back-button')
    var editPostSection = document.querySelector('#edit-post-section')
    var editPostCancelButton = editPostSection.querySelector('#edit-post-cancel-button')
    var editPostForm = editPostSection.querySelector('form')
    var messageSection = document.querySelector('#message-section')

    try {
        var user = logic.retrieveUser()

        title.innerText = 'Welcome, ' + user.name + '!'
    } catch (error) {
        console.error(error)

        alert(error.message)

        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        }

        location.href = '../login'
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

    showCreatePostFormButton.onclick = function () {
        createPostSection.style.display = 'block'
    }

    createPostCancelButton.onclick = function () {
        createPostSection.style.display = 'none'
    }

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
                    var editButton = document.createElement('button')

                    editButton.innerText = '🖊'

                    editButton.onclick = function () {
                        var textInput = editPostForm.querySelector('#text')

                        textInput.value = post.text

                        editPostForm.addEventListener('submit', function (event) {
                            event.preventDefault()

                            var text = textInput.value

                            try {
                                logic.modifyPost(post.id, text)

                                editPostForm.reset()

                                editPostSection.style.display = ''

                                renderPosts()
                            } catch (error) {
                                console.error(error)

                                alert(error.message)
                            }
                        })

                        editPostSection.style.display = 'block'
                    }

                    article.append(deleteButton, editButton)
                }

                postListSection.appendChild(article)
            })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    renderPosts()

    var renderMessagesIntervalId

    chatButton.addEventListener('click', function () {
        postListSection.style.display = 'none'
        footer.style.display = 'none'
        chatButton.style.display = 'none'

        homeButton.style.display = 'block'
        chatSection.style.display = 'block'

        var userList = chatSection.querySelector('#user-list')

        userList.innerHTML = ''

        try {
            var users = logic.retrieveUsers()

            users.forEach(function (user) {
                var item = document.createElement('li')

                item.classList.add('user-list__item')

                if (user.status === 'online')
                    item.classList.add('user-list__item--online')
                else if (user.status === 'offline')
                    item.classList.add('user-list__item--offline')

                item.innerText = user.username

                item.addEventListener('click', function () {
                    var usernameTitle = chatPanel.querySelector('#chat-panel__username')

                    usernameTitle.innerText = user.username

                    function renderMessages() {
                        try {
                            var messages = logic.retrieveMessagesWithUser(user.id)

                            var messageList = chatPanel.querySelector('#message-list')

                            messageList.innerHTML = ''

                            messages.forEach(function (message) {
                                var messageParagraph = document.createElement('p')

                                messageParagraph.innerText = message.text

                                if (message.from === logic.getLoggedInUserId()) {
                                    messageParagraph.classList.add('message-list__item--right')
                                } else {
                                    messageParagraph.classList.add('message-list__item--left')
                                }
                                messageList.appendChild(messageParagraph)
                            })
                        } catch (error) {
                            console.error(error)

                            alert(error.message)

                        }
                    }
                    renderMessages()

                    clearInterval(renderMessagesIntervalId)

                    renderMessagesIntervalId = setInterval(renderMessages, 1000)

                    chatForm.onsubmit = function (event) {
                        event.preventDefault()


                        var textInput = chatForm.querySelector('#text')
                        var text = textInput.value

                        try {
                            logic.sendMessageToUser(user.id, text)

                            chatForm.reset()

                            renderMessages()
                        } catch (error) {
                            console.error(error)

                            alert(error.message)

                        }
                    }

                    chatPanel.style.display = 'block'
                })

                userList.appendChild(item)
            })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    })

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

    editPostCancelButton.addEventListener('onclick', function () {
        editPostSection.style.display = ''
    })

})()
