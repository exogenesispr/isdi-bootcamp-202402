import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../core/Component.mjs'
import Form from '../core/Form.mjs'
import Label from '../core/Label.mjs'
import Input from '../core/Input.mjs'
import DateInput from '../core/DateInput.mjs'
import EmailInput from '../core/EmailInput.mjs'
import PasswordInput from '../core/PasswordInput.mjs'
import Button from '../core/Button.mjs'
import Link from '../core/Link.mjs'

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

        const submitButton = new Button
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

                location.href = '../login'
            } catch (error) {
                utils.showFeedback(error)
            }
        })

        form.add(nameLabel, nameInput, birthdateLabel, birthdateInput, emailLabel, emailInput, usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton)

        const link = new Link
        link.setText('Login')
        link.setHref('../login')

        this.add(title, form, link)
    }
}

export default Register