// presentation

(function () {
    var title = document.querySelector('h1')
    var logoutButton = document.querySelector('#logoutbutton')
    var showCreatePostFormButton = document.querySelector('#show-create-post-form-button')
    var createPostForm = document.querySelector('#create-post-form')
    var postListSection = document.querySelector('#post-list-section')
    var createPostSection = document.querySelector('#create-post-section')
    var buttonDeletePostPlural = document.querySelectorAll('#button-delete-post')


    try {
        var user = logic.retrieveUser()

        title.innerText = 'Welcome, ' + user.name + '!'
    } catch (error) {
        alert(error.message)
    }

    logoutButton.addEventListener('click', function () {
        logic.logoutUser()

        var loginAdress = location.href.replace('home', 'login')

        location.href = loginAdress
    })

    showCreatePostFormButton.addEventListener('click', function () {
        logic.showForm('create-post-section')
    })

    createPostForm.addEventListener('submit', function (event) {
        event.preventDefault()

        var imageInput = document.getElementById('createpost-link')
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
                authorHeading.innerText = post.author

                var image = document.createElement('img')
                image.src = post.image

                var paragraph = document.createElement('p')
                paragraph.innerText = post.text

                var dateTime = document.createElement('time')
                dateTime.innerText = post.date

                article.append(authorHeading, image, paragraph, dateTime)


                postListSection.appendChild(article)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    renderPosts()




})()