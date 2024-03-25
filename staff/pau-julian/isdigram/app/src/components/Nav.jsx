import utils from '../utils'

import logic from '../logic'

import { Component } from 'react'

class Nav extends Component {
    constructor() {
        super()

    }

    render() {
        const { navStatus } = this.props
        return (
            <nav>
                {navStatus === 'chat' && <button onClick={(event) => {
                    event.preventDefault()

                    this.props.onNavHomeClick()
                }}>🏡</button>}
                {navStatus === 'home' && <button onClick={(event) => {
                    event.preventDefault()

                    this.props.onNavChatClick()
                }}>💬</button>}

                <button onClick={(event) => {
                    event.preventDefault()

                    try {
                        logic.logoutUser()

                        this.onLogoutClick()
                    } catch (error) {
                        utils.showFeedback(error)
                    }

                }}>🚪</button>
            </nav>
        )
    }
}

export default Nav