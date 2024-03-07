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

                //var deleteButton

                if (post.author.id === logic.getLoggedInUserId()) {
                    var deleteButton = document.createElement('button')
                    deleteButton.setAttribute('id', 'button-delete-post')
                    deleteButton.innerText = 'Delete🗑Post'

                    deleteButton.addEventListener('click', function () {
                        //logic.removePost(post.id)
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

})()

//'[{"author":"jambo","image":"https://images.mediotiempo.com/EB_bKN3nLnGgacxJ0oAVBuJYDCc=/958x596/uploads/media/2019/08/06/cristiano-ronaldo-revela-significado-grito.jpg","text":"asd","date":"2024-03-06, 8:22:59 p.m.","id":1709752979238},{"author":"jambo","image":"https://www.ole.com.ar/2022/12/09/l3UKqacEZ_1200x630__1.jpg","text":"anda pasha","date":"2024-03-06, 8:23:11 p.m.","id":1709752991949},{"author":"pepitogrillo","image":"https://www.ole.com.ar/2022/12/09/l3UKqacEZ_1200x630__1.jpg","text":"bobito","date":"2024-03-06, 8:24:09 p.m.","id":1709753049601},{"author":"pepitogrillo","image":"https://images.mediotiempo.com/EB_bKN3nLnGgacxJ0oAVBuJYDCc=/958x596/uploads/media/2019/08/06/cristiano-ronaldo-revela-significado-grito.jpg","text":"siu","date":"2024-03-06, 8:24:19 p.m.","id":1709753059465}]'