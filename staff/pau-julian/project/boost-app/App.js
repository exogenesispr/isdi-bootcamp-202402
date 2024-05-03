import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import logic from './logic'
import { HomeStackScreen, LandingStackScreen } from './navigation/MainStack'
import { useContext } from './context'
const { useEffect, useState } = React

export default function App() {
  const [user, setUser] = useState('')
  const [stamp, setStamp] = useState(null)
  const [wowToken, setWowToken] = useState(null)
  const [isUserLogged, setIsUserLogged] = useState(false)

  useEffect(() => {
    logic.isUserLoggedIn()
      .then((loggedIn) => {
        setIsUserLogged(loggedIn)
        if (loggedIn) {
          logic.retrieveUser()
            .then((userData) => {
              setUser(userData)
            })
            .catch((error) => {
              Alert.alert('Error retrieving user data', error)
            })
        }
      })
      .catch((error) => {
        Alert.alert('Error checking user login:', error)
      })
  }, [])

  return (
    <Context.Provider value={{ user, setUser, stamp, setStamp, wowToken, setWowToken }}>

      <NavigationContainer>
        {isUserLogged ? <HomeStackScreen /> : <LandingStackScreen />}

      </NavigationContainer>

    </Context.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
