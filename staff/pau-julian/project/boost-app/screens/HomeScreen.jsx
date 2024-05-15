import { View, Text, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { useContext } from '../context'
import useCommunities from '../hooks/useCommunities'
import ServiceDisplay from '../components/ServiceDisplay'
import { StatusBar } from 'expo-status-bar'
import logic from '../logic'
import Header from '../components/Header'
import commonStyles from '../commonStyles'

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
            <View style={commonStyles.mainContainer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }

    return (
        <View style={commonStyles.mainContainer}>
            <StatusBar style='auto' />
            <Header />

            <View style={styles.container}>
                <Text style={commonStyles.headingText}>Welcome to Boost! </Text>
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
        padding: 25,
        marginTop: 0,
    },
    heading: {
        fontSize: 90,
        marginBottom: 30,
    },
    icon: {
        resizeMode: 'contain',
        height: 40,
        width: 40,
    }
});