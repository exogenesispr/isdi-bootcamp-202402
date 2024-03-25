import { Component } from 'react'

class Chat extends Component {
    constructor() {
        super()

    }

    render() {
        return <main className="main">
            <h1>Hello, jambo!</h1>
            <nav>
                <button onClick={(event) => {
                    event.preventDefault()

                    this.props.onNavHomeClick()
                }}>🏡</button>
                <button onClick={(event) => {
                    event.preventDefault()

                    this.props.onNavLogoutClick()
                }}>🚪</button>
            </nav>
            <section>
                <ul>
                    <li className="user-list__item user-list__item--online">
                        mmmm
                    </li>
                    <li className="user-list__item user-list__item--offline">
                        pepitogrillo
                    </li>
                </ul>
                <h3>pepitogrillo</h3>
                <ul className="message-list">
                    <li className="message-list__item--left">eyou eyou</li>
                    <li className="message-list__item--left">klk</li>
                    <li className="message-list__item--right">que paso</li>
                    <li className="message-list__item--right">como andas man</li>
                    <li className="message-list__item--left">bien y vos?</li>
                </ul>
                <form >
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" />
                    <button className="round-button submit-button" type="submit">Send</button>
                </form>
            </section>
        </main>
    }
}

export default Chat