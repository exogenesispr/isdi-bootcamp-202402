import utils from '../utils.mjs'

import logic from '../logic.mjs'

import { Component } from 'react'
import Nav from '../components/Nav'
import UserList from '../components/UserList'

class Chat extends Component {
    constructor() {
        super()

        try {
            const user = logic.retrieveUser()

            this.user = user
        } catch (error) {
            utils.showFeedback(error)
        }
    }

    render() {
        const navStatus = 'chat'
        return (
            <main className="main">
                <h1>Hello, {this.user.name}!</h1>

                <Nav onNavHomeClick={() => this.props.onNavHomeClick()} navStatus={navStatus} />

                <UserList />
            </main>
        )
    }
}

export default Chat