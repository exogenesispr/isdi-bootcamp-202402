import { logger, showFeedback } from '../utils/index.mjs'

import logic from '../logic.mjs'

import { Component } from 'react'
import SubmitButton from './library/SubmitButton'

class SendMessageForm extends Component {
    constructor() {
        logger.debug('SendMessageForm')

        this.state = {
            stamp: null,
            userTo: this.props.userTo
        }
        super()

    }

    handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        logger.debug('SendMessageForm -> handleSubmit', text)

        try {
            logic.sendMessageToUser(this.state.userTo.id, text)

            form.reset()

            // props.onUserLoggedIn()
        } catch (error) {
            utils.showFeedback(error)
        }
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="text">Text</label>
                <input type="text" id='text' />

                <SubmitButton>Send</SubmitButton>
            </form>
        )
    }
}

export default SendMessageForm