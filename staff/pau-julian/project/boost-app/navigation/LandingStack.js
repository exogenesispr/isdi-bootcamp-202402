import React from 'react'
import { View, Text, Button, StyleSheet, } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LandingScreen from '../screens/LandingScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'

const LandingStack = createNativeStackNavigator()

export default function LandingStackScreen() {
    return (
        <LandingStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <LandingStack.Screen name='Landing' component={LandingScreen} />
            <LandingStack.Screen name='Login' component={LoginScreen} />
            <LandingStack.Screen name='Register' component={RegisterScreen} />
        </LandingStack.Navigator>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         top: 0,
//         position: 'absolute',
//         display: 'flex',
//         flexDirection: 'row',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     }
// })