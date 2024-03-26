import { logger, showFeedback } from '../utils/'

import logic from '../logic.mjs'

import { Component } from 'react'

class UserList extends Component {
    constructor() {
        super()

        try {
            const users = logic.retrieveUsers()

            this.state = {
                users,
            }
        } catch (error) {
            utils.showFeedback(error)
        }

    }

    render() {
        return (
            <ul>
                {this.state.users.map((user) => <li key={user.id} className='user-list__item'>{user.username}</li>)}


            </ul>

        )
    }
}

export default UserList