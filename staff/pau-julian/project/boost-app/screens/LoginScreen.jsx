import React, { useState } from 'react'
import logic from '../logic'

import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, Alert, Pressable, Image } from 'react-native'
import { useContext } from '../context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import commonStyles from '../commonStyles'


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
                    Alert.alert('Error with credentials', error.message)
                })
        } catch (error) {
            Alert.alert('Validation error', error.message)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <View style={commonStyles.mainContainer}>
            <StatusBar style='auto' />
            <View style={styles.loginContainer}>
                <Image
                    source={require('../assets/icons/logo-pau.png')}
                    style={styles.bigIcon}
                />
                <View style={styles.container}>
                    <TextInput style={commonStyles.input} placeholder='Username'
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput secureTextEntry={!showPassword} style={commonStyles.input} placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                    />
                    {<MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} style={styles.icon}
                        onPress={toggleShowPassword} />}
                </View>
                <Pressable style={commonStyles.button} onPress={handleLogin}>
                    <Text style={commonStyles.buttonText}>Log in</Text>
                </Pressable>
            </View>

            <Pressable style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Register</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 200,
        width: '100%',
        height: 'auto'
    },
    loginContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 240,
    },
    icon: {
        position: 'absolute',
        right: 18,
        top: 90,
        padding: 10,
    },
    bigIcon: {
        position: 'absolute',
        padding: 10,
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    registerText: {
        color: '#58545B',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        padding: 10,
        borderRadius: 5,
    },

})

export default LoginScreen