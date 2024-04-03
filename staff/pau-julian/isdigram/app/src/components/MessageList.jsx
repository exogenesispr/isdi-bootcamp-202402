import { logger, showFeedback } from '../utils'

import logic from '../logic.mjs'

import { Component } from 'react'

class MessageList extends Component {
    constructor() {
        logger.debug('MessageList')
        super()

        try {
            const messages = logic.retrieveMessagesWithUser(this.props.userTo.id)

            this.state = {
                messages,
                userTo: this.props.userTo,
                stamp: this.props.stamp,
            }
        } catch (error) {
            showFeedback(error)
        }
    }

    render() {

        return (
            <ul>
                {this.state.messages.map((message) => <p key={message.id} className={message.from === logic.getLoggedInUserId() ? 'message-list__item--right' : 'message-list__item--left'}>{message.text}</p>)}
            </ul>
        )

    }
}

export default MessageList