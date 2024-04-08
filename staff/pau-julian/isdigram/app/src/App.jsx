import { logger } from './utils'

import logic from './logic.mjs'

import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  logger.debug('App')

  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'landing')

  const goToLogin = () => setView('login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => setView('register')

  const handleUserLoggedIn = () => setView('home')

  const handleUserLoggedOut = () => goToLogin()

  const handleNavChatClick = () => setView('chat')

  const handleNavHomeClick = () => this.setState({ view: 'home' })

  return <>
    {view === 'landing' && <Landing onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />}
    {view === 'login' && <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />}
    {view === 'register' && <Register onLoginClick={handleLoginClick} onRegisteredUser={handleLoginClick} />}
    {view === 'home' && <Home onUserLoggedOut={handleUserLoggedOut} onNavChatClick={handleNavChatClick} />}
    {view === 'chat' && <Chat onUserLoggedOut={handleUserLoggedOut} onNavHomeClick={handleNavHomeClick} />}
  </>
}



export default App
