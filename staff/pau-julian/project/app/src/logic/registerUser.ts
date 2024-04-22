


function registerUser(username, password, dcName, language) {


    const user = { username, password, dcName, language }

    const json = JSON.stringify(user)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
            'Content-type': 'application/json'
        },
        body: json
    })
        .then((res) => {
            if (res.status === 201) return

            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default registerUser