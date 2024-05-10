import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackScreen from './HomeStack'
import UserStackScreen from './UserStack'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { util } from '../com/index.js'

const Tab = createBottomTabNavigator()

const tabScreenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        backgroundColor: '#7ABA78',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        height: 80
    },
}

export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={tabScreenOptions}
        >
            <Tab.Screen name='HomeStack' component={HomeStackScreen} options={{
                tabBarIcon: () => (<AntDesign name='home' color='#000000' size={30} />)
            }} />
            <Tab.Screen name='UserStack' component={UserStackScreen} options={{
                tabBarIcon: () => (<AntDesign name='user' color='#000000' size={30} />)
            }} />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#E69561',
        borderRadius: 20,
        height: 90,
        bottom: 20,
        left: 20,
        right: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingBottom: 10
    }
})