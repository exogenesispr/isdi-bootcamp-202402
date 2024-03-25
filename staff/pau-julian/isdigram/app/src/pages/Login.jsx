import utils from '../utils.mjs'

import logic from '../logic.mjs'

import { Component } from 'react'

class Login extends Component {
    constructor() {
        super()
    }

    render() {
        return <main>
            <h1>Log in</h1>
            <form onSubmit={(event) => {
                event.preventDefault()

                const form = event.target

                const username = form.username.value
                const password = form.password.value

                try {
                    logic.loginUser(username, password)

                    form.reset()

                    this.props.onUserLoggedIn()
                } catch (error) {
                    utils.showFeedback(error)
                }
            }}>
                <label htmlFor="username">Username</label>
                <input id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button className="round-button submit-button" type="submit">Log in</button>
            </form>
            <a href="" onClick={(event) => {
                event.preventDefault()

                this.props.onRegisterClick()
            }}>Register</a>
        </main>
    }
}

export default Login