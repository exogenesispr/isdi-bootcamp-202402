import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './MainStack'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { util } from '../com/index.js'

const Tab = createBottomTabNavigator()

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen name='Home' component={HomeStack} options={{
                tabBarIcon: () => (<AntDesign name='home' color='#000000' size={30} />)
            }} />
            <Tab.Screen name='User' component={UserScreen} options={{
                tabBarIcon: () => (<AntDesign name='user' color='#000000' size={30} />)
            }} />

        </Tab.Navigator>
    )
}

export default Tabs

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