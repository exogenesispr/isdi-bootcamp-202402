import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import logic from './logic'
import { HomeStackScreen, LandingStackScreen } from './navigation/MainStack'

export default function App() {
  return (
    <NavigationContainer>
      {logic.isUserLoggedIn() ? <HomeStackScreen /> : <LandingStackScreen />}

    </NavigationContainer>
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
