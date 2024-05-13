import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { useContext } from '../context'
import useCommunities from '../hooks/useCommunities'
import ServiceDisplay from '../components/ServiceDisplay'
import { StatusBar } from 'expo-status-bar'
import logic from '../logic'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

function HomeScreen({ navigation }) {
    const { communities, cheapest } = useCommunities()
    const { user, setCommunities, setWowToken } = useContext()

    useEffect(() => {
        try {
            logic.retrieveWowTokenData()
                .then((wowToken) => {
                    console.log(wowToken)
                    setWowToken(wowToken)
                })
                .catch((error) => {
                    Alert.alert(`Can't retrieve WOW token data`, error.message)
                })
        } catch (error) {
            Alert.alert(`Failed to fetch token data`, error.message)
        }
    }, [setWowToken])

    useEffect(() => {
        try {
            setCommunities(communities)
            console.log('communities printed after setting in context:', communities)
        } catch (error) {
            Alert.alert(`Failed to set communities`, error.message)
        }

    }, [communities])

    const onPressService = (service) => {
        navigation.navigate('ServiceList', { serviceType: service })
    }

    if (!user || !cheapest) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar style='auto' />
            <Header />

            <View style={styles.container}>
                {user ? <Text > Welcome {user.username}!</Text> : <Text >Welcome!</Text>}
            </View>

            <ServiceDisplay cheapest={cheapest} isTouchable={true} onPressService={onPressService} />

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 12,
        marginTop: 40,
    },
    heading: {
        fontSize: 90,
        marginBottom: 30,
    },
});