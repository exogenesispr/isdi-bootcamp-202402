import AsyncStorage from '@react-native-async-storage/async-storage'

function logoutUser() {
    AsyncStorage.removeItem('token')
}

export default logoutUser