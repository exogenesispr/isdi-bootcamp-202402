class Login extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <main>
            <h1>Log in</h1>
            <form action="submit">
                <label>Username</label>
                <input id="username" />
                <label>Password</label>
                <input type="password" id="password" />
                <button className="round-button submit-button" type="submit">Log in</button>
            </form>
            <a href="">Register</a>
        </main>
    }
}