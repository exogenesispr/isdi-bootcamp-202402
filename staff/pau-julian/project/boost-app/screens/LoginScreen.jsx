import React, { useState } from 'react'
import logic from '../logic'

import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'


function LoginScreen({ navigation, HomeScreen }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        console.log('USERNAME', username)
        console.log('PASSWORD', password)

        try {
            logic.loginUser(username, password)
                .then(() => {
                    setUsername('')
                    setPassword('')
                    navigation.navigate('Home')
                })
                .catch((error) => {
                    Alert.alert(error.message)
                })
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <View style={styles.container}>
            <Text>Log in here</Text>

            <TextInput style={styles.input} placeholder='Username'
                value={username}
                onChangeText={setUsername}
            />

            <TextInput secureTextEntry={true} style={styles.input} placeholder='password'
                value={password}
                onChangeText={setPassword}
            />

            <Button title='Log in' onPress={handleLogin} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
        </View>
    )
}

const style = StyleSheet.create({
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