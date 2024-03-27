import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { Component } from 'react'

class Nav extends Component {
    constructor() {
        logger.debug('Nav')

        super()
    }

    handleHomeClick = (event) => {
        event.preventDefault()

        this.props.onNavHomeClick()
    }

    handleChatClick = (event) => {
        event.preventDefault()

        this.props.onNavChatClick()
    }

    handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUser()
        } finally {
            this.props.onNavLogoutClick()
        }
    }

    render() {
        logger.debug('Nav -> render')
        const { navStatus } = this.props
        return (
            <nav>
                {navStatus === 'chat' && <button onClick={this.handleHomeClick}>🏡</button>}
                {navStatus === 'home' && <button onClick={this.handleChatClick}>💬</button>}

                <button onClick={this.handleLogoutClick}>🚪</button>
            </nav>
        )
    }
}

export default Nav