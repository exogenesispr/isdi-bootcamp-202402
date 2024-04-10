import { logger, showFeedback } from '../utils'

import logic from '../logic'
import CancelButton from './library/CancelButton'
import SubmitButton from './library/SubmitButton'

import './CreatePost.sass'

function CreatePost(props) {
    logger.debug('CreatePost')

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text, (error) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                form.reset()

                props.onPostCreated()
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreatePost -> render')
    return (
        <section className='create-post'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Image</label>
                <input type="text" id="image" />

                <label htmlFor="text">Image</label>
                <input type="text" id="text" />

                <SubmitButton>Create</SubmitButton>
            </form>

            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
        </section>
    )
}

export default CreatePost