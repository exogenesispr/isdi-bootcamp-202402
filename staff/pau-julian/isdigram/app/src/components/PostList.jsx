import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'
import Post from './Post'

import { useContext } from '../context'

function PostList({ stamp, onEditPostClick }) {
    logger.debug('PostList')

    const { showFeedback } = useContext()

    const [posts, setPosts] = useState([])


    const loadPosts = () => {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePosts()
                .then(setPosts)
                .catch((error) => showFeedback(error.message, 'error'))
        } catch (error) {
            showFeedback(error.message)
        }
    }

    useEffect(() => {
        loadPosts()
    }, [stamp])

    const handlePostDeleted = () => loadPosts()

    const handleEditClick = (post) => onEditPostClick(post)

    logger.debug('PostList -> render')

    return (
        <section>
            {posts.map((post) => <Post key={post.id} item={post} onEditClick={handleEditClick} onDeleted={handlePostDeleted} />)}
        </section>
    )
}

export default PostList