import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native'
import logic from '../logic'
import { MaterialIcons } from '@expo/vector-icons'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function LandingScreen({ navigation }) {
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        try {
            logic.retrieveCommunities()
                .then(setCommunities)
                .catch((error) => Alert.alert(error.message))
        } catch (error) {
            Alert.alert(error.message)
        }
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
            </View>

            <ScrollView >
                <View>
                    <Text style={styles.heading}>Welcome to Boost</Text>
                </View>
                <View style={styles.container}>
                    <Button title='Log in' onPress={() => navigation.navigate('Login')} />

                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.service1}>

                        </View>
                        <View style={styles.service2}>

                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.service3}>

                        </View>
                        <View style={styles.service4}>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
