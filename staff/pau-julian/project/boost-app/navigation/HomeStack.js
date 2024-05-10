import React from 'react'
import { View, Text, Button, StyleSheet, } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ServiceListScreen from '../screens/ServiceListScreen'
import ProviderScreen from '../screens/ProviderScreen'

const HomeStack = createNativeStackNavigator()

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <HomeStack.Screen name='Home' component={HomeScreen} />
            <HomeStack.Screen name='ServiceList' component={ServiceListScreen} />
            <HomeStack.Screen name='Provider' component={ProviderScreen} />
        </HomeStack.Navigator>
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