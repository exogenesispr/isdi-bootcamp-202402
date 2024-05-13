import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native'
import Service from './Service'

const LanguageOptions = ['EN', 'ES', 'IT', 'DE', 'PT', 'RU']

function ServiceList({ services, serviceType, navigation }) {
    const [languageFilter, setLanguageFilter] = useState('')

    const filteredServices = services.filter((service) => service.price.hasOwnProperty(serviceType) && (languageFilter ? service.language.includes(languageFilter) : true))

    const handleLanguageFilter = (language) => {
        setLanguageFilter(language)
    }

    return (
        <View style={styles.container}>
            <View style={styles.languageFilter}>
                <Text style={styles.filterLabel}>Language filter:</Text>
                {LanguageOptions.map((language) => (
                    <Pressable key={language} onPress={() => handleLanguageFilter(language)}>
                        <Text
                            style={[
                                styles.filterOption,
                                languageFilter === language && styles.activeFilter,
                            ]}
                        >
                            {language}
                        </Text>
                    </Pressable>
                ))}
            </View>
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
        flex: 1,
        backgroundColor: '#fff'
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