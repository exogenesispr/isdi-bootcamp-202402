import utils from '../utils'

import logic from '../logic.mjs'

import { Component } from 'react'
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import Nav from '../components/Nav'

class Home extends Component {
    constructor() {
        super()

        try {
            const user = logic.retrieveUser()

            this.user = user
        } catch (error) {
            utils.showFeedback(error)
        }

        this.state = { view: null, stamp: null }
    }


    render() {
        const navStatus = 'home'
        return <main className="main">
            <h1>Hello, {this.user.name}!</h1>

            <Nav onNavChatClick={() => this.props.onNavChatClick()} navStatus={navStatus} />

            <PostList refreshStamp={this.state.stamp} onEditPostClick={() => this.setState({ view: 'edit-post' })} />

            {this.state.view === 'create-post' && <CreatePost onCancelClick={() => this.setState({ view: null })} onPostCreated={() => {
                this.setState({ view: null, stamp: Date.now() })
            }} />}

            {this.state.view === 'edit-post' && <EditPost onCancelClick={() => this.setState({ view: null })} />}


            <footer className="footer">
                <button onClick={() => this.setState({ view: 'create-post' })}>➕</button>
            </footer>
        </main>
    }
}

export default Home