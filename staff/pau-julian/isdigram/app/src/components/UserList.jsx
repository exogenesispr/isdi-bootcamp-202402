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
            }
        } catch (error) {
            showFeedback(error)
        }

    }

    render() {
        return (
            <ul>
                {this.state.users.map((user) => <li user={user} key={user.id} className={user.status === 'online' ? 'user-list__item user-list__item--online' : 'user-list__item user-list__item--offline'} >{user.username}</li>)}


            </ul>

        )
    }
}

export default UserList