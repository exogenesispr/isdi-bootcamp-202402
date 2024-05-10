import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Alert, Linking, ActivityIndicator, Pressable } from 'react-native'
import { Clipboard } from 'expo-clipboard'
import logic from '../logic'
import { util } from '../com/index.js'
import moment from 'moment'

export default function ProviderScreen({ route }) {
    debugger
    const [provider, setProvider] = useState({})
    const [isCommunity, setIsCommunity] = useState(false)

    const { priceFormatter } = util
    const { id } = route.params

    const handleDiscordCommunityLinkPress = () => {
        Linking.openURL(provider.dcReference)
            .catch((error) => Alert.alert(`Can't open discord`, error))
    }

    const handleDiscordUserLinkPress = () => {
        Clipboard.setString(provider.dcName)
        Linking.openURL('discord://')
            .catch((error) => {
                Alert.alert('Discord App not found', error)
            })
    }

    useEffect(() => {
        try {
            logic.getProviderById(id)
                .then((providerData) => {
                    console.log(providerData)
                    setProvider(providerData)
                    if (provider.hasOwnProperty('name')) {
                        setIsCommunity(true)
                    }
                })
                .catch((error) => Alert.alert('Error getting provider data', error))
        } catch (error) {
            Alert.alert('Error fetching data:', error)
        }

        // return (() => {
        //     setProvider(null)
        //     setIsCommunity(false)
        // })
    }, [id])

    // if (!provider) {
    //     return (
    //         <View style={styles.container}>
    //             <ActivityIndicator size='large' color='#0000ff' />
    //         </View>
    //     )
    // }

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(provider)}</Text>
            {provider && <Text style={styles.heading}>{isCommunity ? provider.name : provider.username}</Text>}
            {provider && isCommunity ? <Pressable style={styles.button} onPress={handleDiscordCommunityLinkPress}>
                <Text style={styles.buttonText}>Join Discord</Text>
            </Pressable>
                :
                <Pressable style={styles.button} onPress={handleDiscordUserLinkPress} >
                    <Text style={styles.buttonText}>Contact on Discord</Text>
                </Pressable>}

            {provider && <View style={styles.container}>
                <Text style={styles.heading} >Prices</Text>
                <View style={styles.row}>
                    <View style={styles.serviceBox}>
                        <Text style={styles.serviceTitle}>Mythic 10</Text>
                        <Text style={styles.servicePrice}>{priceFormatter(provider.price.m10.value)}</Text>
                        <Text style={styles.serviceDate}>{moment(provider.price.m10.lastEdited).format('HH:mm DD/MM')}</Text>
                    </View>
                </View>
                {isCommunity && <View style={styles.row}>
                    <View style={styles.serviceBox}>
                        <Text style={styles.serviceTitle}>Raid Vip</Text>
                        <Text style={styles.servicePrice}>{priceFormatter(provider.price.raidVip.value)}</Text>
                        <Text style={styles.serviceDate}>{moment(provider.price.raidVip.lastEdited).format('HH:mm DD/MM')}</Text>
                    </View>
                    <View style={styles.serviceBox}>
                        <Text style={styles.serviceTitle}>Raid Unsaved</Text>
                        <Text style={styles.servicePrice}>{priceFormatter(provider.price.raidUnsaved.value)}</Text>
                        <Text style={styles.serviceDate}>{moment(provider.price.raidUnsaved.lastEdited).format('HH:mm DD/MM')}</Text>
                    </View>
                    <View style={styles.serviceBox}>
                        <Text style={styles.serviceTitle}>Raid Saved</Text>
                        <Text style={styles.servicePrice}>{priceFormatter(provider.price.raidSaved.value)}</Text>
                        <Text style={styles.serviceDate}>{moment(provider.price.raidSaved.lastEdited).format('HH:mm DD/MM')}</Text>
                    </View>
                </View>}

            </View>}

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    serviceContainer: {
        flex: 1,
        width: '100%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serviceBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 16,
    },
    serviceDate: {
        fontSize: 12,
        color: '#666',
    },
})