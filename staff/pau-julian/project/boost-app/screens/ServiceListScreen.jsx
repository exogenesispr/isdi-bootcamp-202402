import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useContext } from '../context'
import ServiceList from '../components/ServiceList'
import logic from '../logic'
import { util } from '../com/index.js'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar'
import commonStyles from '../commonStyles'

export default function ServiceListScreen({ navigation, route }) {
    const { serviceType } = route.params
    const { communities } = useContext()
    const [providers, setProviders] = useState([])
    const { sortProvidersByServicePrice, formatServiceName } = util

    useEffect(() => {
        if (serviceType === 'm10') {
            try {
                logic.retrieveUsersByStatus()
                    .then((usersOnline) => {
                        const newProviders = usersOnline.concat(communities)
                        const sortedProviders = sortProvidersByServicePrice(newProviders, serviceType)
                        setProviders(sortedProviders)
                    })
                    .catch((error) => Alert.alert('Error fetching data', error))
            } catch (error) {
                Alert.alert('Error with fetch', error)
            }
        } else {
            const sortedCommunities = sortProvidersByServicePrice(communities, serviceType)
            setProviders(sortedCommunities)
        }
    }, [])

    return (
        <View style={commonStyles.mainContainer}>
            <StatusBar style='auto' />

            <Header />

            <View style={styles.container}>
                <Text style={commonStyles.headingText}>{formatServiceName(serviceType)}</Text>
            </View>
            <ServiceList services={providers} serviceType={serviceType} navigation={navigation} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 25,
        marginTop: 0,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
})