import { logger } from './utils'

import logic from './logic/index.js'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

function App() {
  logger.debug('App')

  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/')

  const handleUserLoggedOut = () => goToLogin()

  const handleNavChatClick = () => navigate('/chat')

  const handleNavHomeClick = () => navigate('/')

  return <>
    <Routes>
      <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />
      <Route path='/register' element={logic.isUserLoggedIn ? <Navigate to='/' /> : <Register onLoginClick={handleLoginClick} onRegisteredUser={handleLoginClick} />} />
      <Route path='/' element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to='/login' />} />
    </Routes>
  </>
}



export default App
