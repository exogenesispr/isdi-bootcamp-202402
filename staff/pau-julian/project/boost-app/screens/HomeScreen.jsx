import { View, Text, StyleSheet, Button, ScrollView, FlatList } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useCommunities from '../hooks/useCommunities'
import { useState, useEffect } from 'react'
import { useContext } from '../context'
import ServiceDisplay from '../components/ServiceDisplay'
import logic from '../logic'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

function HomeScreen({ navigation }) {
    const { setCommunities, setWowToken } = useContext()
    const { communities, cheapest } = useCommunities()

    { communities && setCommunities(communities) }

    const onPressService = (service) => {
        if (service === 'm10')
            navigation.navigate('m10')
        else if (service === 'raidVip')
            navigation.navigate('raidVip')
        else if (service === 'raidUnsaved')
            navigation.navigate('raidUnsaved')
        else if (service === 'raidSaved')
            navigation.navigate('raidSaved')
        else
            navigation.navigate('Home')
    }




    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                {user ? <Text style={styles.text}> Welcome {user.username}!</Text> : <Text style={styles.text}>Welcome!</Text>}
            </View>

            <ServiceDisplay cheapest={cheapest} isTouchable={true} onPressService={onPressService} />

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