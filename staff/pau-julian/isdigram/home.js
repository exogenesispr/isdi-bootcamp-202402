// presentation

(function () {
    var title = document.querySelector('h1')
    var logoutButton = document.querySelector('#logoutbutton')
    var showForm = document.querySelector('#create-post')
    var form = document.querySelector('form')


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

    showForm.addEventListener('click', function () {
        logic.showForm('createpost-form')
    })

    form.addEventListener('submit', function (event) {

        var imageInput = document.getElementById('createpost-link')
        var image = imageInput.value

        var textInput = document.getElementById('createpost-text')
        var text = textInput.value

        logic.createPost(image, text)
    })

})()