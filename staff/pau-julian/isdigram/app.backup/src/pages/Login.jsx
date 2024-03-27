import { logger, showFeedback } from '../utils/'

import logic from '../logic.mjs'

import { Component } from 'react'

class Login extends Component {
    constructor() {
        logger.debug('Login')

        super()
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit', username, password)

        try {
            logic.loginUser(username, password)

            form.reset()

            this.props.onUserLoggedIn()
        } catch (error) {
            utils.showFeedback(error)
        }
    }

    onRegisterClick = (event) => {
        event.preventDefault()

        this.props.onRegisterClick()
    }

    render() {
        logger.debug('Login -> render')

        return <main>
            <h1>Log in</h1>

            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button className="round-button submit-button" type="submit">Log in</button>
            </form>

            <a href="" onClick={this.onRegisterClick}>Register</a>
        </main>
    }
}

export default Login