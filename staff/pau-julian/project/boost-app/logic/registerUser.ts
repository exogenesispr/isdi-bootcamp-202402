import { validate, errors } from '../com/index.js'


function registerUser(username: string, password: string, dcName: string, language) {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.text(dcName, 'dcName', true)
    validate.language(language)

    const user = { username, password, dcName, language }

    const json = JSON.stringify(user)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/eu/users`, {
        method: 'POST',
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