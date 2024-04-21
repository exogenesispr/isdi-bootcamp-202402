import { logger } from '../utils'

import logic from '../logic/index.js'

import { Routes, Route } from 'react-router-dom'

import { useState, useEffect } from 'react'
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import Nav from '../components/Nav'
import Profile from '../components/Profile.jsx'

import { useContext } from '../context.js'

function Home(props) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [post, setPost] = useState(null)

    const { showFeedback } = useContext()

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch((error) => showFeedback(error.message, 'error'))
        } catch (error) {
            showFeedback(error.message)
        }
    }, [])

    const clearView = () => setView(null)

    const handleCreatePostCancelClick = () => clearView()

    const handlePostCreated = () => {
        clearView()
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
        clearView()
        setStamp(Date.now())
        setPost(null)
    }

    const handleNavChatClick = () => props.onNavChatClick()

    const navStatus = 'home'

    return <>
        <header className='px-[5vw] fixed top-0 bg-white w-full'>
            {user && <h1>Hello, {user.name}!</h1>}

            <Nav onNavChatClick={handleNavChatClick} onNavLogoutClick={handleLogoutClick} navStatus={navStatus} />
        </header>
        <main className="my-[50px] px-[5vw]">
            <Routes>
                <Route path='/' element={<PostList stamp={stamp} onEditPostClick={handleEditPostClick} />} />
                <Route path='/profile/:username' element={<Profile />} />
            </Routes>


            {view === 'create-post' && <CreatePost onCancelClick={handleCreatePostCancelClick} onPostCreated={handlePostCreated} />}

            {view === 'edit-post' && <EditPost post={post} onCancelClick={handleEditPostCancelClick} onPostEdited={handlePostEdited} />}

            <footer className="fixed bottom-0 w-full h-[50px]] flex justify-center items-center p-[10px] box-border bg-white">
                <button onClick={handleCreatePostClick}>➕</button>
            </footer>
        </main>
    </>

}

export default Home