import AsyncStorage from '@react-native-async-storage/async-storage'
import { validate, errors } from '../com/index.js'
import { decode } from 'base-64'

function modifyUserOnlineStatus(online) {
    return AsyncStorage.getItem('token')
        .then((token) => {
            validate.token(token)
            //@ts-ignore
            const [, payloadB64] = token.split('.')

            const payloadJSON = decode(payloadB64)

            const payload = JSON.parse(payloadJSON)

            const { sub: userId } = payload

            const json = JSON.stringify({ online })

            return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: json
            })
                .then((res) => {
                    if (res.status === 204) {
                        return res
                    }
                    return res.json()
                        .then((body) => {
                            const { error, message } = body
                            const constructor = errors[error]
                            throw new constructor(message)
                        })
                })
        })
}

export default modifyUserOnlineStatus