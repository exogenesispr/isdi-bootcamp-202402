import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, StyleSheet, Alert, Linking, Image, Pressable, Modal, Vibration } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'
import logic from '../logic'
import { util } from '../com/index.js'
import moment from 'moment'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import commonStyles from '../commonStyles'
import { FontAwesome6 } from '@expo/vector-icons';

export default function ProviderScreen({ route }) {
    const [provider, setProvider] = useState(null)
    const [isCommunity, setIsCommunity] = useState(false)
    const [copied, setCopied] = useState(false)

    const { priceFormatter, getServiceImage } = util
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
        Vibration.vibrate(100)
        setTimeout(() => setCopied(false), 2000)
    }


    const handleDiscordCommunityLinkPress = () => {
        Linking.openURL(provider.dcReference)
            .catch((error) => Alert.alert(`Can't open discord`, error.message))
    }

    const handleDiscordUserLinkPress = () => {
        Linking.openURL('discord://app/channels/@me')
            .catch((error) => {
                Alert.alert('Discord App not found', error.message)
            })
    }

    return (
        <View style={commonStyles.mainContainer}>
            <StatusBar />
            <Header />
            {provider && (
                <>
                    <View style={styles.container}>
                        <Image
                            source={getServiceImage(provider)}
                            style={styles.bigIcon}
                        />
                        <Pressable style={styles.button} onLongPress={isCommunity ? null : handleClipboardPress} >
                            <View style={styles.row}>
                                <Text style={styles.heading}>{isCommunity ? provider.name : provider.username}</Text>
                                {isCommunity ? null : <FontAwesome6 name="file-clipboard" size={24} color="black" style={{ marginLeft: 10 }} />}
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.tableHeading}>Prices</Text>
                        <View style={styles.priceContainerBorder}>
                            <View style={styles.column}>
                                <View style={styles.serviceBox}>
                                    <View style={styles.serviceBoxWithTextAlignStart}>
                                        <Text style={styles.serviceTitle}>Mythic 10</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.servicePrice}>{priceFormatter(provider.price?.m10?.value)}</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.serviceDate}>{moment(provider.price?.m10?.lastEdited).format('HH:mm DD/MM')}</Text>
                                    </View>
                                </View>
                            </View>
                            {isCommunity && <View style={styles.column}>
                                <View style={styles.serviceBox}>
                                    <View style={styles.serviceBoxWithTextAlignStart}>
                                        <Text style={styles.serviceTitle}>Raid Vip</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.servicePrice}>{priceFormatter(provider.price?.raidVip?.value)}</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.serviceDate}>{moment(provider.price?.raidVip?.lastEdited).format('HH:mm DD/MM')}</Text>
                                    </View>
                                </View>
                                <View style={styles.serviceBox}>
                                    <View style={styles.serviceBoxWithTextAlignStart}>
                                        <Text style={styles.serviceTitle}>Raid Unsaved</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.servicePrice}>{priceFormatter(provider.price?.raidUnsaved?.value)}</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.serviceDate}>{moment(provider.price?.raidUnsaved?.lastEdited).format('HH:mm DD/MM')}</Text>
                                    </View>
                                </View>
                                <View style={styles.serviceBox}>
                                    <View style={styles.serviceBoxWithTextAlignStart}>
                                        <Text style={styles.serviceTitle}>Raid Saved</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.servicePrice}>{priceFormatter(provider.price?.raidSaved?.value)}</Text>
                                    </View>
                                    <View style={styles.serviceBoxWithTextAlignEnd}>
                                        <Text style={styles.serviceDate}>{moment(provider.price?.raidSaved?.lastEdited).format('HH:mm DD/MM')}</Text>
                                    </View>
                                </View>
                            </View>}
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        {isCommunity ? (
                            <Pressable style={styles.button} onPress={handleDiscordCommunityLinkPress}>
                                <Text style={styles.buttonText}>Join Discord</Text>
                            </Pressable>
                        ) : (
                            <Pressable style={styles.button} onPress={handleDiscordUserLinkPress} >
                                <Text style={styles.buttonText}>Contact on Discord</Text>
                            </Pressable>
                        )}
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/discordlogo.png')}
                        />
                    </View>
                </>
            )}

            <Modal
                animationType='fade'
                transparent={true}
                visible={copied}
                onRequestClose={() => {
                    setCopied(false)
                    // handleDiscordUserLinkPress
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    bigIcon: {
        height: 120,
        width: 120,
    },
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        paddingRight: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#5661ea',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonView: {
        backgroundColor: '#f6f2f6',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 70,
    },
    copyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    priceContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    priceContainerBorder: {
        borderWidth: 2,
        borderColor: '#58545B',
        borderRadius: 10,
        backgroundColor: '#f6f2f6',
        padding: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10,
    },
    tableHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    serviceBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '96%',
        paddingVertical: 16,
        paddingLeft: 10,
    },
    serviceBoxWithTextAlignStart: {
        alignItems: 'flex-start',
        width: '33%',
    },
    serviceBoxWithTextAlignEnd: {
        alignItems: 'flex-end',
        width: '33%',
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 18,
    },
    serviceDate: {
        fontSize: 12,
        color: '#000000',
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
    copiedText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})