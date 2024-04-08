import { logger, showFeedback } from '../utils'

import logic from '../logic'

function Nav(props) {
    logger.debug('Nav')

    const handleHomeClick = (event) => {
        event.preventDefault()

        props.onNavHomeClick()
    }

    const handleChatClick = (event) => {
        event.preventDefault()

        props.onNavChatClick()
    }

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUser()
        } finally {
            props.onNavLogoutClick()
        }
    }

    logger.debug('Nav -> render')

    const { navStatus } = props

    return (
        <nav>
            {navStatus === 'chat' && <button onClick={handleHomeClick}>🏡</button>}
            {navStatus === 'home' && <button onClick={handleChatClick}>💬</button>}

            <button onClick={handleLogoutClick}>🚪</button>
        </nav>
    )
}

export default Nav