import { logger, showFeedback } from '../utils/'

import logic from '../logic'
import CancelButton from './library/CancelButton'
import SubmitButton from './library/SubmitButton'

import './EditPost.sass'

function EditPost(props) {
    logger.debug('EditPost')

    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        logger.debug('EditPost -> handleSubmit', text)

        try {
            logic.modifyPost(props.post.id, text)

            form.reset()

            props.onPostEdited()
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()


    logger.debug('EditPost -> render')

    return (
        <section className='mb-[50px] fixed bottom-0 left-0 bg-white w-full box-border p-[5vw]'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label htmlFor="text">Edit</label>
                <input type="text" id='text' defaultValue={props.post.text} />

                <SubmitButton>Save</SubmitButton>
            </form>

            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
        </section>
    )
}

export default EditPost