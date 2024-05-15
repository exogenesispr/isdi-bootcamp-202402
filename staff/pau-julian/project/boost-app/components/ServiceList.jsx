import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native'
import Service from './Service'
import commonStyles from '../commonStyles'


function ServiceList({ services, serviceType, navigation }) {
    const [languageFilter, setLanguageFilter] = useState('')

    return (
        <View style={styles.container}>

            <FlatList
                data={services}
                renderItem={({ item }) =>
                    <Service service={item} navigation={navigation} serviceType={serviceType} />
                }
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ServiceList

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 230,
    },
    languageFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterLabel: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    filterOption: {
        marginRight: 10,
        color: '#666',
    },
    activeFilter: {
        color: 'blue',
        fontWeight: 'bold',
    }
})