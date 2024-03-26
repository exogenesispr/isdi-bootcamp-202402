import { logger, showFeedback } from '../utils/'

import logic from '../logic.mjs'

import { Component } from 'react'

class Register extends Component {
    constructor() {
        logger.debug('Register')

        super()
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, birthdate, email, username, password)

            form.reset()

            this.props.onRegisteredUser()
        } catch (error) {
            showFeedback(error)
        }
    }

    handleLoginClick = (event) => {
        event.preventDefault()

        this.props.onLoginClick()
    }

    render() {
        logger.debug('Register -> render')
        return (
            <main>
                <h1>Register</h1>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="text">Name</label>
                    <input type="text" id="text" />

                    <label htmlFor="birthdate">Birthdate</label>
                    <input type="date" id="birthdate" />

                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' />

                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' />

                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' />

                    <button className='round-button submit-button' type='submit'>Register</button>
                </form>

                <a href="" onClick={this.handleLoginClick}>Login</a>
            </main >
        )
    }
}

export default Register
