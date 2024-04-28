import { View, Text, StyleSheet, Button, ScrollView, FlatList } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import logic from '../logic'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

function HomeScreen({ navigation }) {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {user ? <Text style={styles.text}> Welcome {user.username}!</Text> : <Text style={styles.text}>Welcome</Text>}
            </View>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        marginTop: 40
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {

    },
    h1: {
        fontSize: 90,
        marginBottom: 30,
    }
})