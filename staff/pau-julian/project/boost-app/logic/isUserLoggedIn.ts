import { validate } from 'com'
import AsyncStorage from '@react-native-async-storage/async-storage'

function isUserLoggedIn() {
    return AsyncStorage.getItem('token')
        .then((token) => {
            validate.token(token)

            return (!!token)
        })
}

export default isUserLoggedIn