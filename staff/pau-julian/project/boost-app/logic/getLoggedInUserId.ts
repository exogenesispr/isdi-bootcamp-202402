import { validate } from '../com/index.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode } from 'base-64'

function getLoggedInUserId() {
    return AsyncStorage.getItem('token')
        .then((token) => {
            validate.token(token)
            //@ts-ignore
            const [, payloadB64] = token.split('.')
            const payloadJSON = decode(payloadB64)
            const payload = JSON.parse(payloadJSON)
            const { sub: userId } = payload

            return userId
        })

}

export default getLoggedInUserId