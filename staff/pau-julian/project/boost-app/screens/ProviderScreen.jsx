import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, StyleSheet, Alert, Linking, ActivityIndicator, Pressable, Modal } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'
import logic from '../logic'
import { util } from '../com/index.js'
import moment from 'moment'
import { StatusBar } from 'expo-status-bar'

export default function ProviderScreen({ route }) {
    const [provider, setProvider] = useState(null)
    const [isCommunity, setIsCommunity] = useState(false)
    const [copied, setCopied] = useState(false)

    const { priceFormatter } = util
    const { id } = route.params

    useFocusEffect(
        useCallback(() => {
            try {
                logic.getProviderById(id)
                    .then((providerData) => {
                        console.log('provider data:', providerData)
                        setProvider(providerData)
                        setIsCommunity(providerData.hasOwnProperty('name'))
                    })
            } catch (error) {
                Alert.alert('Error fetching data:', error.message)
            }

            return () => {
                setProvider(null)
                setIsCommunity(false)
            }
        }, [id])
    )

    const handleClipboardPress = () => {
        Clipboard.setStringAsync(provider.dcName.toString())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    const handleDiscordCommunityLinkPress = () => {
        Linking.openURL(provider.dcReference)
            .catch((error) => Alert.alert(`Can't open discord`, error.message))
    }

    const handleDiscordUserLinkPress = () => {
        Linking.openURL('discord://')
            .catch((error) => {
                Alert.alert('Discord App not found', error.message)
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            {provider && (
                <>
                    <Text>{JSON.stringify(provider)}</Text>

                    <Pressable style={styles.copyButton} onLongPress={handleClipboardPress}>
                        <Text style={styles.heading}>{isCommunity ? provider.name : provider.username}</Text>
                    </Pressable>

                    {/* {copied && <Text style={styles.copiedText}>Discord name copied to clipboard!</Text>} */}

                    {isCommunity ? (
                        <Pressable style={styles.button} onPress={handleDiscordCommunityLinkPress}>
                            <Text style={styles.buttonText}>Join Discord</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={styles.button} onPress={handleDiscordUserLinkPress} >
                            <Text style={styles.buttonText}>Contact on Discord</Text>
                        </Pressable>
                    )}

                    <View style={styles.container}>
                        <Text style={styles.heading} >Prices</Text>
                        <View style={styles.row}>
                            <View style={styles.serviceBox}>
                                <Text style={styles.serviceTitle}>Mythic 10</Text>
                                <Text style={styles.servicePrice}>{priceFormatter(provider.price?.m10?.value)}</Text>
                                <Text style={styles.serviceDate}>{moment(provider.price?.m10?.lastEdited).format('HH:mm DD/MM')}</Text>
                            </View>
                        </View>
                        {isCommunity && <View style={styles.row}>
                            <View style={styles.serviceBox}>
                                <Text style={styles.serviceTitle}>Raid Vip</Text>
                                <Text style={styles.servicePrice}>{priceFormatter(provider.price?.raidVip?.value)}</Text>
                                <Text style={styles.serviceDate}>{moment(provider.price?.raidVip?.lastEdited).format('HH:mm DD/MM')}</Text>
                            </View>
                            <View style={styles.serviceBox}>
                                <Text style={styles.serviceTitle}>Raid Unsaved</Text>
                                <Text style={styles.servicePrice}>{priceFormatter(provider.price?.raidUnsaved?.value)}</Text>
                                <Text style={styles.serviceDate}>{moment(provider.price?.raidUnsaved?.lastEdited).format('HH:mm DD/MM')}</Text>
                            </View>
                            <View style={styles.serviceBox}>
                                <Text style={styles.serviceTitle}>Raid Saved</Text>
                                <Text style={styles.servicePrice}>{priceFormatter(provider.price?.raidSaved?.value)}</Text>
                                <Text style={styles.serviceDate}>{moment(provider.price?.raidSaved?.lastEdited).format('HH:mm DD/MM')}</Text>
                            </View>
                        </View>}

                    </View>
                </>
            )}

            <Modal
                animationType='fade'
                transparent={true}
                visible={copied}
                onRequestClose={() => {
                    setCopied(false)
                    handleDiscordUserLinkPress
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.copiedText}>Discord name copied to clipboard!</Text>
                    </View>
                </View>
            </Modal>
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
    copyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
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
    modalContainer: {
        flex: 0.99,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        boxShadow: {
            shadowColor: "gray",
            shadowOffset: {
                width: 6,
                height: 6,
            },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 15,
        }
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    copiedText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})