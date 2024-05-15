import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView, StyleSheet, ActivityIndicator, Pressable, Text } from 'react-native'
import { util } from '../com/index.js'
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons';
import commonStyles from '../commonStyles.js'


export default function ServiceDisplay({ cheapest, onPressService, isTouchable }) {
    const [renderCompo, setRenderCompo] = useState(false)

    const { cheapestM10: m10, cheapestRaidVip: raidVip, cheapestRaidUnsaved: raidUnsaved, cheapestRaidSaved: raidSaved } = cheapest
    const { getServiceImage, getBackgroundColor, priceFormatter } = util

    const ServiceContainer = isTouchable ? Pressable : View

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                {m10 && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(m10) }
                ]}
                    onPress={() => onPressService && onPressService('m10')}
                >
                    <View>
                        <Text style={styles.serviceHeading}>Mythic 10</Text>

                        <View style={styles.serviceRow}>
                            <Image
                                style={styles.icon}
                                source={getServiceImage(m10)}
                            />
                            <Text style={styles.serviceText}>{m10.name}</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <FontAwesome5 name="coins" size={30} color="gold" />
                            <Text style={styles.serviceValue}>{priceFormatter(m10.price.m10.value)}</Text>
                        </View>

                    </View>
                    <View >
                        <Text style={styles.serviceDate}>{moment(m10.price.m10.lastEdited).fromNow()}</Text>
                    </View>
                </ServiceContainer>}
                {raidVip && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(raidVip) }
                ]}
                    onPress={() => onPressService && onPressService('raidVip')}
                >
                    <View>
                        <Text style={styles.serviceHeading}>Raid Vip</Text>

                        <View style={styles.serviceRow}>
                            <Image
                                style={styles.icon}
                                source={getServiceImage(raidVip)}
                            />
                            <Text style={styles.serviceText}>{raidVip.name}</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <FontAwesome5 name="coins" size={30} color="gold" />
                            <Text style={styles.serviceValue}>{priceFormatter(raidVip.price.raidVip.value)}</Text>
                        </View>

                    </View>
                    <View >
                        <Text style={styles.serviceDate}>{moment(raidVip.price.raidVip.lastEdited).fromNow()}</Text>
                    </View>
                </ServiceContainer>}
            </View>
            <View style={styles.row}>
                {raidUnsaved && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(raidUnsaved) }
                ]}
                    onPress={() => onPressService && onPressService('raidUnsaved')}
                >
                    <View>
                        <Text style={styles.serviceHeading}>Raid Unsaved</Text>

                        <View style={styles.serviceRow}>
                            <Image
                                style={styles.icon}
                                source={getServiceImage(raidUnsaved)}
                            />
                            <Text style={styles.serviceText}>{raidUnsaved.name}</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <FontAwesome5 name="coins" size={30} color="gold" />
                            <Text style={styles.serviceValue}>{priceFormatter(raidUnsaved.price.raidUnsaved.value)}</Text>
                        </View>

                    </View>
                    <View >
                        <Text style={styles.serviceDate}>{moment(raidUnsaved.price.raidUnsaved.lastEdited).fromNow()}</Text>
                    </View>
                </ServiceContainer>}
                {raidSaved && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(raidSaved) }
                ]}
                    onPress={() => onPressService && onPressService('raidSaved')}
                >
                    <View>
                        <Text style={styles.serviceHeading}>Raid Saved</Text>

                        <View style={styles.serviceRow}>
                            <Image
                                style={styles.icon}
                                source={getServiceImage(raidSaved)}
                            />
                            <Text style={styles.serviceText}>{raidSaved.name}</Text>
                        </View>

                        <View style={styles.serviceRow}>
                            <FontAwesome5 name="coins" size={30} color="gold" />
                            <Text style={styles.serviceValue}>{priceFormatter(raidSaved.price.raidSaved.value)}</Text>
                        </View>

                    </View>
                    <View >
                        <Text style={styles.serviceDate}>{moment(raidSaved.price.raidSaved.lastEdited).fromNow()}</Text>
                    </View>
                </ServiceContainer>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 70,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    serviceContainer: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10,
    },
    serviceHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    serviceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    serviceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    serviceDate: {
        fontSize: 12,
        color: '#e1d5d9',
        textAlign: 'right',
    },
    m10: {

    },
    raidVip: {

    },
    raidUnsaved: {

    },
    raidSaved: {

    },
    icon: {
        height: 45,
        width: 45,
    }
})