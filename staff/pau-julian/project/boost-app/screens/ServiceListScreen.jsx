import react from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useContext } from '../context'
import ServiceList from '../components/ServiceList'

export default function ServiceListScreen({ navigation, serviceType }) {
    const { communities } = useContext()

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Prices :{serviceType}</Text>
            <ServiceList services={communities} serviceType={serviceType} navigation={navigation} />
        </View>

    )
}