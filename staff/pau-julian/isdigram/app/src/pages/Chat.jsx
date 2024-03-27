import { logger, showFeedback } from '../utils/'

import logic from '../logic.mjs'

import { Component } from 'react'
import Nav from '../components/Nav'
import UserList from '../components/UserList'

class Chat extends Component {
    constructor() {
        logger.debug('Chat')
        super()

        try {
            const user = logic.retrieveUser()

            this.user = user
        } catch (error) {
            showFeedback(error)
        }
    }

    handleLogoutClick = () => this.props.onUserLoggedOut()

    render() {
        logger.debug('Chat -> render')
        const navStatus = 'chat'
        return (
            <main className="main">
                <h1>Hello, {this.user.name}!</h1>

                <Nav onNavHomeClick={() => this.props.onNavHomeClick()} onNavLogoutClick={this.handleLogoutClick} navStatus={navStatus} />

                <UserList />
            </main>
        )
    }
}

export default Chat