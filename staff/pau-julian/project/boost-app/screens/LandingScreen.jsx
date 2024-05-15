import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Image, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import logic from '../logic'
import { AntDesign } from '@expo/vector-icons'
import { util } from '../com/index.js'
import useCommunities from '../hooks/useCommunities'
import ServiceDisplay from '../components/ServiceDisplay'
import commonStyles from '../commonStyles'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function LandingScreen({ navigation }) {
    const { cheapest } = useCommunities()

    return (
        <View style={commonStyles.mainContainer}>
            <StatusBar style='auto' />
            <View style={commonStyles.container}>
                <Image
                    style={styles.icon}
                    source={require('../assets/icons/logo-pau.png')}
                    resizeMode='contain'
                />
                <Text style={commonStyles.heading}>Boost</Text>
            </View>
            <View>
                <View style={commonStyles.row}>
                    <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Register')}>
                        <Text style={commonStyles.buttonText}>Register</Text>
                    </Pressable>
                    <Pressable style={commonStyles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={commonStyles.buttonText}>Log in</Text>
                    </Pressable>
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
    icon: {
        height: 50,
        width: 50,
    }
});