import { errors } from 'com'
import dotenv from 'dotenv'

function retrieveWowTokenData() {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/eu/wowtoken`)
        .then((res) => {
            if (res.status === 200)
                return res.json

            return res.json()
                .then((body) => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default retrieveWowTokenData