import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { Component } from 'react'
import Post from './Post'

class PostList extends Component {
    constructor() {
        logger.debug('PostList')
        super()

        this.state = {
            posts: []
        }
    }

    loadPosts() {
        logger.debug('PostList -> loadPosts')

        try {
            logic.retrievePosts((error, posts) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    componentWillReceiveProps(newProps) {
        logger.debug('PostList -> componentWillReceiveProps', JSON.stringify(this.props), JSON.stringify(newProps))

        newProps.stamp !== this.props.stamp && this.loadPosts()
    }

    componentDidMount() {
        logger.debug('postList -> componentDidMount')

        this.loadPosts()
    }

    handlePostDeleted = () => this.loadPosts()

    handleEditClick = (post) => this.props.onEditPostClick(post)

    render() {
        logger.debug('PostList -> render')

        return (
            <section>
                {this.state.posts.map((post) => <Post key={post.id} item={post} onEditClick={this.handleEditClick} onDeleted={this.handlePostDeleted} />)}
            </section>
        )
    }
}

export default PostList