import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../components/core/Component.mjs'
import Form from '../components/core/Form.mjs'
import Label from '../components/core/Label.mjs'
import Input from '../components/core/Input.mjs'
import DateInput from '../components/core/DateInput.mjs'
import EmailInput from '../components/core/EmailInput.mjs'
import PasswordInput from '../components/core/PasswordInput.mjs'
import Link from '../components/core/Link.mjs'

import SubmitButton from '../components/library/SubmitButton.mjs'

class Register extends Component {
    constructor() {
        super('main')

        const title = new Component('h1')
        title.setText('Register')

        const form = new Form

        const nameLabel = new Label
        nameLabel.setText('name')
        nameLabel.setFor('name')

        const nameInput = new Input
        nameInput.setId('name')

        const birthdateLabel = new Label
        birthdateLabel.setText('birthdate')
        birthdateLabel.setFor('birthdate')

        const birthdateInput = new DateInput
        birthdateInput.setId('birthdate')

        const emailLabel = new Label
        emailLabel.setText('email')
        emailLabel.setFor('email')

        const emailInput = new EmailInput
        emailInput.setId('email')

        const usernameLabel = new Label
        usernameLabel.setText('Username')
        usernameLabel.setFor('username')

        const usernameInput = new Input
        usernameInput.setId('username')

        const passwordLabel = new Label
        passwordLabel.setText('password')
        passwordLabel.setFor('password')

        const passwordInput = new PasswordInput
        passwordInput.setId('password')

        const submitButton = new SubmitButton
        submitButton.setText('Register')
        submitButton.setType('submit')

        form.onSubmit((event) => {
            event.preventDefault()

            const name = nameInput.getValue()
            const birthdate = birthdateInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.registerUser(name, birthdate, email, username, password)

                form.reset()

                this._onUserRegisteredCallback()
            } catch (error) {
                utils.showFeedback(error)
            }
        })

        form.add(nameLabel, nameInput, birthdateLabel, birthdateInput, emailLabel, emailInput, usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton)

        const loginlink = new Link
        loginlink.setText('Login')
        loginlink.setHref('')
        loginlink.onClick((event) => {
            event.preventDefault()

            this._onLoginClickCallback()
        })

        this.add(title, form, loginlink)

        this._onUserRegisteredCallback = null
        this._onLoginClickCallback = null
    }

    onLoginClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onLoginClickCallback = callback
    }

    onUserRegistered(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onUserRegisteredCallback = callback
    }
}

export default Register