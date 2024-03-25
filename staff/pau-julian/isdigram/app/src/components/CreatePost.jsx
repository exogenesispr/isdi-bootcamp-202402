import utils from '../utils'

import logic from '../logic'

import { Component } from 'react'

class CreatePost extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section className='create-post'>
                <form action="" onSubmit={event => {
                    event.preventDefault()

                    const form = event.target

                    const image = form.image.value
                    const text = form.text.value

                    try {
                        logic.createPost(image, text)

                        form.reset()

                        this.props.onPostCreated()
                    } catch (error) {
                        utils.showFeedback(error)
                    }

                }}>
                    <label htmlFor="text">Image</label>
                    <input type="text" id="image" />

                    <label htmlFor="text">Image</label>
                    <input type="text" id="text" />

                    <button className='round-button submit-button'>Create</button>
                </form>

                <button className='round-button cancel-button' onClick={() => this.props.onCancelClick()}>Cancel</button>
            </section>
        )
    }
}

export default CreatePost