import { validate } from '../com/index.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

function isUserLoggedIn() {
    return AsyncStorage.getItem('token')
        .then((token) => {
            console.log(token)

            if (token !== null && token !== '') {
                validate.token(token)
                return true
            } else {
                return false
            }
        })
        .catch((error) => {
            console.error('Error retrieving token from AsyncStorage', error)
            return false
        })
}

export default isUserLoggedIn

// return AsyncStorage.getItem('token')
//         .then((token) => {
//             console.log(token)
//             validate.token(token)

//             return (!!token)
//         })