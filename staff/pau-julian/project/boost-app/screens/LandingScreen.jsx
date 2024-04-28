import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import logic from '../logic'
import { MaterialIcons } from '@expo/vector-icons'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function LandingScreen({ navigation }) {
    const [m10, setM10] = useState({})
    const [raidVip, setRaidVip] = useState({})
    const [raidUnsaved, setRaidUnsaved] = useState({})
    const [raidSaved, setRaidSaved] = useState({})

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
            </View>

            <ScrollView >
                <View>
                    <Text style={styles.heading}>Welcome to Boost</Text>

                </View>
            </ScrollView>
        </View>
    )
}
