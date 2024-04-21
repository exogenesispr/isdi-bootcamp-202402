import { logger, showFeedback } from '../utils'

import logic from '../logic'
import CancelButton from './library/CancelButton'
import SubmitButton from './library/SubmitButton'
import { useContext } from '../context'

import './CreatePost.sass'

function CreatePost({ onPostCreated, onCancelClick }) {
    logger.debug('CreatePost')

    const { showFeedback } = useContext()

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text)
                .then(() => {
                    form.reset()

                    onPostCreated()
                })
                .catch((error) => showFeedback(error.message, 'error'))
        } catch (error) {
            showFeedback(error.message)
        }
    }

    const handleCancelClick = () => onCancelClick()

    logger.debug('CreatePost -> render')
    return (
        <section className='mb-[50px] fixed bottom-0 left-0 bg-white w-full box-border p-[5vw]'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label htmlFor="text">Image</label>
                <input type="text" id="image" />

                <label htmlFor="text">Text</label>
                <input type="text" id="text" />

                <SubmitButton>Create</SubmitButton>
            </form>

            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
        </section>
    )
}

export default CreatePost