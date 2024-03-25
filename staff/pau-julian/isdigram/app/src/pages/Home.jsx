import { Component } from 'react'

class Home extends Component {
    constructor() {
        super()
    }


    render() {
        return <main className="main">
            <h1>Hello, jambo!</h1>
            <nav>
                <button onClick={(event) => {
                    event.preventDefault()

                    this.props.onNavChatClick()
                }}>💬</button>
                <button>🚪</button>
            </nav>
            <section>
                <article>
                    <h3>jambo</h3>
                    <img src="	https://pbs.twimg.com/media/D0RrZQrX4AUZB9-?format=jpg&name=360x360" alt="Un corito sano" />
                    <p>
                        con un corito sano con el primo luca tamo difrutando con un manguito maracaton dite algo primo luca
                    </p>
                    <p>2024-03-20</p>
                    <button>🗑</button>
                    <button>📝</button>
                </article>
                <article>
                    <h3>jambo</h3>
                    <img src="https://www.cabq.gov/artsculture/biopark/news/10-cool-facts-about-penguins/@@images/1a36b305-412d-405e-a38b-0947ce6709ba.jpeg " alt="penguin" />
                    <p>a dormir</p>
                    <p>2024-03-17</p>
                    <button>🗑</button>
                    <button>📝</button>
                    <h3>jambo</h3>
                    <img src="	https://latinafy.com/cdn/shop/files/gorra-anda-palla-bobo_464x464.jpg?v=1689351685 " alt="messi" />
                    <p>anda pasha</p>
                    <p>2024-03-17</p>
                    <button>🗑</button>
                    <button>📝</button>
                    <h3>jambo</h3>
                    <img src="	https://cope-cdnmed.cope.es/resources/jpg/7/8/1573004134187.jpg " alt="el rey emerito" />
                    <p>porq no te callas</p>
                    <p>2024-03-14</p>
                    <button>🗑</button>
                    <button>📝</button>
                </article>
            </section>
            <footer className="footer">
                <button>➕</button>
            </footer>
        </main>
    }
}

export default Home