

function loginUser(username, password) {


    const user = { username, password }

    const json = JSON.stringify(user)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })

        .then((res) => {
            if (res.status === 200)
                return res.json()
                    .then((token) => { sessionStorage.token = token })

            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default loginUser