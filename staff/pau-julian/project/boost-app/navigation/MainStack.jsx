import React from 'react'
import { View, Text, Button, StyleSheet, } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LandingScreen from '../screens/LandingScreen'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ServiceListScreen from '../screens/ServiceListScreen'
import ProviderScreen from '../screens/ProviderScreen'
import UserScreen from '../screens/UserScreen'

const LandingStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

export function LandingStackScreen() {
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

export function HomeStackScreen() {
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

export function UserStackScreen() {
    <UserStack.Navigator>
        <UserStack.Screen name='UserProfile' component={UserScreen} />
    </UserStack.Navigator>
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})