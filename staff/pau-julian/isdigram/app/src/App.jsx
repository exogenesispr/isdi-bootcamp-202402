import { logger } from './utils'

import logic from './logic/index.js'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Feedback from './components/Feedback.jsx'
import { useState } from 'react'
import { useContext } from './context'
import Confirm from './components/Confirm'
import { showFeedback } from './utils/index.js'

function App() {
  const [feedback, setFeedback] = useState(null)
  const [confirm, setConfirm] = useState(null)

  logger.debug('App')

  const navigate = useNavigate()

  const goToLogin = () => navigate('/login')

  const handleLoginClick = () => goToLogin()

  const handleRegisterClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/')

  const handleUserLoggedOut = () => goToLogin()

  const handleNavChatClick = () => navigate('/chat')

  const handleNavHomeClick = () => navigate('/')

  const handleFeedbackAcceptClick = () => setFeedback(null)

  const handleFeedback = (message, level = 'warn') => setFeedback({ message, level })

  const handleConfirm = (message, callback) => setConfirm({ message, callback })

  const handleConfirmCancelClick = () => {
    confirm.callback(false)

    setConfirm(null)
  }

  const handleConfirmAcceptClick = () => {
    confirm.callback(true)

    setConfirm(null)
  }

  return <>
    <Context.Provider value={{ showFeedback: handleFeedback, showConfirm: handleConfirm }}>
      <Routes>
        <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLoggedIn} />} />
        <Route path='/register' element={logic.isUserLoggedIn ? <Navigate to='/' /> : <Register onLoginClick={handleLoginClick} onRegisteredUser={handleLoginClick} />} />
        <Route path='/' element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to='/login' />} />
      </Routes>
    </Context.Provider>

    {feedback && <Feedback message={feedback.message} level={feedback.level} onAcceptClick={handleFeedbackAcceptClick} />}

    {confirm && <Confirm message="hola confirm" onCancelClick={handleConfirmCancelClick} onAcceptClick={handleConfirmAcceptClick} />}
  </>
}

export default App
