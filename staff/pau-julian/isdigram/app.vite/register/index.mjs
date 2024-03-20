import logic from "../logic.mjs"
import utils from "../utils.mjs"

if (logic.isUserLoggedIn()) {
    location.href = '../home'
} else {
    const form = document.querySelector('form')

    form.addEventListener('submit', (event) => {
        console.log('form submit')

        event.preventDefault()

        const nameInput = document.getElementById('name')
        const name = nameInput.value

        const birthdateInput = document.getElementById('birthdate')
        const birthdate = birthdateInput.value

        const emailInput = document.getElementById('email')
        const email = emailInput.value

        const usernameInput = document.getElementById('username')
        const username = usernameInput.value

        const passwordInput = document.getElementById('password')
        const password = passwordInput.value

        try {
            logic.registerUser(name, birthdate, email, username, password)

            location.href = '../login'
        } catch (error) {
            utils.showFeedback()
        }
    })
}