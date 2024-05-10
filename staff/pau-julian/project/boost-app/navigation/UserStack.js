import React from 'react'
import { View, Text, Button, StyleSheet, } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserScreen from '../screens/UserScreen'

const UserStack = createNativeStackNavigator()

export default function UserStackScreen() {
    return (
        <UserStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <UserStack.Screen name='UserProfile' component={UserScreen} />
        </UserStack.Navigator>
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