import utils from '../utils.mjs'

import logic from '../logic.mjs'

import { Component } from 'react'

class EditPost extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <section className='edit-post'>
                <form onSubmit={(event) => {
                    event.preventDefault()

                    const form = event.target

                    const text = form.text.value

                    try {
                        logic.modifyPost(post.id, text)

                        form.reset()

                        //this.props.onEditedPost()
                    } catch (error) {
                        utils.showFeedback(error)
                    }
                }}>

                    <label htmlFor="text">Edit</label>
                    <input type="text" id='text' /*value={post.text}*/ />

                    <button className='round-button submit-button'>Save</button>
                </form>
                <button className='round-button cancel-button' onClick={() => this.props.onCancelClick()}>Cancel</button>
            </section>
        )
    }
}

export default EditPost