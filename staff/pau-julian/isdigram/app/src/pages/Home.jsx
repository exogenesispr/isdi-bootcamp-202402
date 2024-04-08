import { logger, showFeedback } from '../utils'

import logic from '../logic.mjs'

import { useState, useEffect } from 'react'
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import Nav from '../components/Nav'

function Home(props) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    showFeedback(error)

                    return
                }

                setUser(user)
            })
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView(null)

    const handleCreatePostCancelClick = () => clearView()

    const handlePostCreated = () => {
        setView(null)
        setStamp(Date.now())
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleLogoutClick = () => { props.onUserLoggedOut() }

    const handleEditPostCancelClick = () => clearView()

    const handleEditPostClick = (post) => {
        setView('edit-post')
        setPost(post)
    }

    const handlePostEdited = () => {
        setView(null)
        setStamp(Date.now())
        setPost(null)
    }

    const handleNavChatClick = () => props.onNavChatClick()

    const navStatus = 'home'

    return <main className="main">
        {user && <h1>Hello, {user.name}!</h1>}

        <Nav onNavChatClick={handleNavChatClick} onNavLogoutClick={handleLogoutClick} navStatus={navStatus} />

        <PostList stamp={stamp} onEditPostClick={handleEditPostClick} />

        {view === 'create-post' && <CreatePost onCancelClick={handleCreatePostCancelClick} onPostCreated={handlePostCreated} />}

        {view === 'edit-post' && <EditPost post={post} onCancelClick={handleEditPostCancelClick} onPostEdited={handlePostEdited} />}

        <footer className="footer">
            <button onClick={handleCreatePostClick}>➕</button>
        </footer>
    </main>

}

export default Home