import { validate, errors } from 'com'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dotenv from 'dotenv'

dotenv.config()

function loginUser(username: string, password: string) {
    validate.text(username, 'username', true)
    validate.password(password)

    const user = { username, password }

    const json = JSON.stringify(user)

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })

        .then((res) => {
            if (res.status === 200)
                return res.json()
                    .then((token) => {
                        return AsyncStorage.setItem('token', token)
                            .then(() => token)
                    })

            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default loginUser