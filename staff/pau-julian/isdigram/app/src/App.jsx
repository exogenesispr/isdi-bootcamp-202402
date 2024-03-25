import logic from './logic.mjs'

import { Component } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chat from './pages/Chat'
import './index.css'

class App extends Component {
  constructor() {
    super()

    this.state = { view: logic.isUserLoggedIn() ? 'home' : 'landing' }
  }
  render() {
    if (this.state.view === 'landing') {
      return <Landing onLoginClick={() => this.setState({ view: 'login' })} onRegisterClick={() => this.setState({ view: 'register' })} />
    } else if (this.state.view === 'login') {
      return <Login onRegisterClick={() => this.setState({ view: 'register' })} onUserLoggedIn={() => this.setState({ view: 'home' })} />
    } else if (this.state.view === 'register') {
      return <Register onLoginClick={() => this.setState({ view: 'login' })} onRegisteredUser={() => this.setState({ view: 'login' })} />
    } else if (this.state.view === 'home') {
      return <Home onNavChatClick={() => this.setState({ view: 'chat' })} />
    } else if (this.state.view === 'chat') {
      return <Chat onNavHomeClick={() => this.setState({ view: 'home' })} />
    } else
      return <h1>🤨</h1>
  }


}

export default App
