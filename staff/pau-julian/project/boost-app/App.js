import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Alert } from 'react-native'

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import logic from './logic'
import LandingStackScreen from './navigation/LandingStack'
import HomeTabs from './navigation/HomeTabs'
import HomeStackScreen from './navigation/HomeStack'
import UserStackScreen from './navigation/UserStack'
import { Context } from './context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const { useEffect, useState } = React

const Tab = createBottomTabNavigator()

export default function App() {
  const [user, setUser] = useState('')
  const [stamp, setStamp] = useState(null)
  const [communities, setCommunities] = useState([])
  const [wowToken, setWowToken] = useState(null)

  const [isUserLogged, setIsUserLogged] = useState(false)

  useEffect(() => {
    logic.isUserLoggedIn()
      .then((loggedIn) => {
        console.log('logged in:', loggedIn)
        setIsUserLogged(loggedIn)
        if (loggedIn) {
          logic.retrieveUser()
            .then((userData) => {
              console.log('user data: ', userData)
              setUser(userData)
            })
            .catch((error) => {
              Alert.alert('Error retrieving user data', error.message)
            })
        }
      })
      .catch((error) => {
        Alert.alert('Error checking user login:', error.message)
      })
  }, [stamp])

  return (
    <Context.Provider value={{ user, setUser, stamp, setStamp, communities, setCommunities, wowToken, setWowToken }}>

      <NavigationContainer>
        {isUserLogged ?
          <HomeTabs />
          :
          <LandingStackScreen />}

      </NavigationContainer>

    </Context.Provider>
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