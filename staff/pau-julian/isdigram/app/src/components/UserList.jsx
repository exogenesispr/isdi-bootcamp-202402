import { logger, showFeedback } from '../utils/'

import logic from '../logic.mjs'

import { Component } from 'react'

class UserList extends Component {
    constructor() {
        logger.debug('UserList')
        super()

        try {
            const users = logic.retrieveUsers()

            this.state = {
                users,
                messageListWithUser: null,
                userTo: null,
                stamp: null,
            }
        } catch (error) {
            showFeedback(error)
        }

    }

    handleUserClick = (user) => this.props.onUserClick(user)

    render() {
        return (
            <ul>
                {this.state.users.map((user) => <li key={user.id} user={user} onClick={this.handleUserClick} className={user.status === 'online' ? 'user-list__item user-list__item--online' : 'user-list__item user-list__item--offline'} >{user.username}</li>)}
            </ul>
        )
    }
}

export default UserList