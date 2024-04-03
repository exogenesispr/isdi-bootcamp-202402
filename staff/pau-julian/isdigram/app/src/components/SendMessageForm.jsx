import { logger, showFeedback } from '../utils/index.mjs'

import logic from '../logic.mjs'

import { Component } from 'react'

class SendMessageForm extends Component {
    constructor() {
        logger.debug('SendMessageForm')

        this.state = {
            stamp: null,

        }
        super()

    }

    handleSubmit = () => { }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="text">Text</label>
                <input type="text" id='text' />
                <button className='round-button submit-button' type='submit'>Send</button>
            </form>
        )
    }
}

export default SendMessageForm