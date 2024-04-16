import { logger, showFeedback } from '../utils/'

import logic from '../logic/index.js'
import SubmitButton from '../components/library/SubmitButton'

function Register(props) {
    logger.debug('Register')

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const birthdate = form.birthdate.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, birthdate, email, username, password)
                .then(() => {
                    form.reset()

                    props.onRegisteredUser()
                })
                .catch(showFeedback)
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleLoginClick = (event) => {
        event.preventDefault()

        props.onLoginClick()
    }

    logger.debug('Register -> render')

    return (
        <main>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
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

                <SubmitButton>Register</SubmitButton>
            </form>

            <a href="" onClick={handleLoginClick}>Login</a>
        </main >
    )
}

export default Register
