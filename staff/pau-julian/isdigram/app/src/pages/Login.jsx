import { logger, showFeedback } from '../utils/'

import logic from '../logic/index.js'
import SubmitButton from '../components/library/SubmitButton'

function Login(props) {
    logger.debug('Login')

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit', username, password)

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    props.onUserLoggedIn()
                })
                .catch(showFeedback)
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleRegisterClick = (event) => {
        event.preventDefault()

        props.onRegisterClick()
    }

    logger.debug('Login -> render')

    return <main>
        <h1>Log in</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <SubmitButton>Log in</SubmitButton>
        </form>

        <a href="" onClick={handleRegisterClick}>Register</a>
    </main>
}


export default Login