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
                userTo: this.props.userTo
            }
        } catch (error) {

        }
    }

    render() {
        const { userTo } = this.state

    }
}