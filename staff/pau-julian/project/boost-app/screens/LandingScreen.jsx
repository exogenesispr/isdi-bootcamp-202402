import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Alert, Image, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import logic from '../logic'
import { AntDesign } from '@expo/vector-icons'
import { util } from '../com/index.js'
import useCommunities from '../hooks/useCommunities'
import ServiceDisplay from '../components/ServiceDisplay'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function LandingScreen({ navigation }) {
    const { cheapest } = useCommunities()

    return (
        <View style={styles.mainContainer}>
            <StatusBar style='auto' />
            <Text style={styles.heading}>Welcome to Boost</Text>

            <View>
                <View>
                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Button title='Log in' onPress={() => navigation.navigate('Login')} />
                        <Button title='Register' onPress={() => navigation.navigate('Register')} />
                    </View>
                </View>
                {cheapest ?
                    <ServiceDisplay cheapest={cheapest} isTouchable={false} />
                    :
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color='#0000ff' />
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {

    },
    container: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    m10: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    raidVip: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    raidUnsaved: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    raidSaved: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    icon: {
        height: 30,
    }
});