import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useContext } from '../context'
import ServiceList from '../components/ServiceList'
import logic from '../logic'
import { util } from '../com/index.js'

export default function ServiceListScreen({ navigation, serviceType }) {
    const { communities } = useContext()
    const [providers, setProviders] = useState([])
    const { sortProvidersByServicePrice } = util

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
            setProviders(communities)
        }

    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Prices :{serviceType}</Text>
            <ServiceList services={providers} serviceType={serviceType} navigation={navigation} />
        </View>

    )
}