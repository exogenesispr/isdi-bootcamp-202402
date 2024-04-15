import { logger, showFeedback } from '../utils'

import logic from '../logic/index.js'

function Post(props) {
    logger.debug('Post')

    const handleDeleteClick = (postId) => {
        if (confirm('delete post?'))
            try {
                logic.removePost(postId)

                props.onDeleted()
            } catch (error) {
                showFeedback(error)
            }
    }

    const handleEditClick = (post) => props.onEditClick(post)

    logger.debug('Post -> render')
    const { item: post } = props

    return <article>
        <h3>{post.author.username}</h3>

        <img src={post.image} />

        <p>{post.text}</p>

        <time>{new Date(post.date).toLocaleDateString('en-CA')}</time>

        {post.author.id === logic.getLoggedInUserId() && <>
            <button onClick={() => handleDeleteClick(post.id)}>🚮</button>
            <button onClick={() => handleEditClick(post)}>📝</button>
        </>}
    </article>
}

export default Post