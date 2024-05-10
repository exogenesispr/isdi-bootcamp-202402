import React, { useState } from 'react'
import logic from '../logic'

import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import { useContext } from '../context'
import { MaterialCommunityIcons } from '@expo/vector-icons'


function LoginScreen({ navigation }) {
    const { setStamp } = useContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        console.log('USERNAME', username)
        console.log('PASSWORD', password)

        try {
            logic.loginUser(username, password)
                .then(() => {
                    setUsername('')
                    setPassword('')
                    setStamp(Date.now())
                    // navigation.navigate('Home')
                })
                .catch((error) => {
                    Alert.alert(error.message)
                })
        } catch (error) {
            console.error(error)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <View style={styles.container}>
            <Text>Log in here</Text>

            <TextInput style={styles.input} placeholder='Username'
                value={username}
                onChangeText={setUsername}
            />

            <TextInput secureTextEntry={!showPassword} style={styles.input} placeholder='password'
                value={password}
                onChangeText={setPassword}
            />
            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} style={styles.icon}
                onPress={toggleShowPassword} />

            <Button title='Log in' onPress={handleLogin} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 40
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 12,
        borderRadius: 12
    },

})

export default LoginScreen