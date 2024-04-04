import { logger, showFeedback } from '../utils/'

import logic from '../logic.mjs'

import { Component } from 'react'
import Nav from '../components/Nav'
import UserList from '../components/UserList'
import MessageList from '../components/MessageList'
import SendMessageForm from '../components/SendMessageForm'

class Chat extends Component {
    constructor() {
        logger.debug('Chat')
        super()

        try {
            const user = logic.retrieveUser()
            this.user = user

            this.state = {
                view: null,
                userTo: null,
                stamp: null,
            }
        } catch (error) {
            showFeedback(error)
        }
    }

    handleLogoutClick = () => this.props.onUserLoggedOut()

    // handleOnUserClick = (event) => {
    //     event.preventDefault()

    //     user = event.target
    //     this.setState({
    //         view: 'message-list',
    //         userTo: user,
    //     })

    // }

    handleOnUserClick = (user) => {
        this.setState({
            view: 'message-list',
            userTo: user,
        })
    }

    render() {
        logger.debug('Chat -> render')
        const navStatus = 'chat'
        return (
            <main className="main">
                <h1>Hello, {this.user.name}!</h1>

                <Nav onNavHomeClick={() => this.props.onNavHomeClick()} onNavLogoutClick={this.handleLogoutClick} navStatus={navStatus} />

                <UserList onUserClick={this.handleOnUserClick} />

                {this.state.view === 'message-list' && <MessageList userTo={this.state.userTo} stamp={this.state.stamp} />}

                {this.state.view === 'message-list' && <SendMessageForm userTo={this.state.userTo} />}
            </main>
        )
    }
}

export default Chat