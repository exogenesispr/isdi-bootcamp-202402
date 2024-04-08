import { logger, showFeedback } from '../utils'

import logic from '../logic.mjs'

import { Component } from 'react'
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import Nav from '../components/Nav'

class Home extends Component {
    constructor() {
        logger.debug('Home')

        super()

        this.state = {
            user: null,
            view: null,
            stamp: null,
            post: null,
        }
    }

    componentDidMount() {
        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                this.setState({ user })
            })
        } catch (error) {
            showFeedback(error)
        }
    }

    setState(state) {
        logger.debug('Home -> setState', JSON.stringify(state))

        super.setState(state)
    }

    clearView = () => this.setState({ view: null })

    handleCreatePostCancelClick = () => this.clearView()

    handlePostCreated = () => this.setState({ view: null, stamp: Date.now() })

    handleCreatePostClick = () => this.setState({ view: 'create-post' })

    handleLogoutClick = () => { this.props.onUserLoggedOut() }

    handleEditPostCancelClick = () => this.clearView()

    handleEditPostClick = (post) => this.setState({ view: 'edit-post', post })

    handlePostEdited = () => this.setState({ view: null, stamp: Date.now(), post: null })


    render() {
        logger.debug('Home -> render')
        const navStatus = 'home'

        return <main className="main">
            {this.state.user && <h1>Hello, {this.state.user.name}!</h1>}

            <Nav onNavChatClick={() => this.props.onNavChatClick()} onNavLogoutClick={this.handleLogoutClick} navStatus={navStatus} />

            <PostList stamp={this.state.stamp} onEditPostClick={this.handleEditPostClick} />

            {this.state.view === 'create-post' && <CreatePost onCancelClick={this.handleCreatePostCancelClick} onPostCreated={this.handlePostCreated} />}

            {this.state.view === 'edit-post' && <EditPost post={this.state.post} onCancelClick={this.handleEditPostCancelClick} onPostEdited={this.handlePostEdited} />}


            <footer className="footer">
                <button onClick={this.handleCreatePostClick}>➕</button>
            </footer>
        </main>
    }
}

export default Home