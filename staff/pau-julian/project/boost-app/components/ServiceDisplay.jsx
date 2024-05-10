import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView, StyleSheet, ActivityIndicator, Pressable, Text } from 'react-native'
import { util } from '../com/index.js'
import moment from 'moment'

export default function ServiceDisplay({ cheapest, onPressService, isTouchable }) {

    // if (!cheapest) {
    //     return <ActivityIndicator size='large' color='#0000ff' />
    // }
    const [renderCompo, setRenderCompo] = useState(false)

    const { cheapestM10: m10, cheapestRaidVip: raidVip, cheapestRaidUnsaved: raidUnsaved, cheapestRaidSaved: raidSaved } = cheapest
    const { getBackgroundColor, priceFormatter } = util

    const ServiceContainer = isTouchable ? Pressable : View

    // useEffect(() => {
    //     if (cheapest) {
    //         setRenderCompo(true)
    //     }
    // }, [cheapest])

    // if (!m10) {
    //     return null
    // }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {m10 && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(m10) }
                ]}
                    onPress={() => onPressService && onPressService('m10')}
                >
                    <Text style={styles.serviceText}>{m10.name} | Mythic 10</Text>
                    <Text style={styles.serviceValue}>{priceFormatter(m10.price.m10.value)}</Text>
                    <Text style={styles.serviceDate}>{moment(m10.price.m10.lastEdited).fromNow()}</Text>

                </ServiceContainer>}
                {raidVip && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(raidVip) }
                ]}
                    onPress={() => onPressService && onPressService('raidVip')}
                >
                    <Text style={styles.serviceText}>{raidVip.name}</Text>
                    <Text style={styles.serviceValue}>{priceFormatter(raidVip.price.raidVip.value)}</Text>
                    <Text style={styles.serviceDate}>{moment(raidVip.price.raidVip.lastEdited).fromNow()}</Text>

                </ServiceContainer>}
            </View>
            <View style={styles.row}>
                {raidUnsaved && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(raidUnsaved) }
                ]}
                    onPress={() => onPressService && onPressService('raidUnsaved')}
                >
                    <Text style={styles.serviceText}>{raidUnsaved.name}</Text>
                    <Text style={styles.serviceValue}>{priceFormatter(raidUnsaved.price.raidUnsaved.value)}</Text>
                    <Text style={styles.serviceDate}>{moment(raidUnsaved.price.raidUnsaved.lastEdited).fromNow()}</Text>

                </ServiceContainer>}
                {raidSaved && <ServiceContainer style={[
                    styles.serviceContainer,
                    { backgroundColor: getBackgroundColor(raidSaved) }
                ]}
                    onPress={() => onPressService && onPressService('raidSaved')}
                >
                    <Text style={styles.serviceText}>{raidSaved.name}</Text>
                    <Text style={styles.serviceValue}>{priceFormatter(raidSaved.price.raidSaved.value)}</Text>
                    <Text style={styles.serviceDate}>{moment(raidSaved.price.raidSaved.lastEdited).fromNow()}</Text>

                </ServiceContainer>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        // width: '100%',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    serviceContainer: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
    },
    serviceText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceValue: {
        fontSize: 14,
        marginBottom: 5,
    },
    serviceDate: {
        fontSize: 12,
        color: '#666',
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
        height: 30,
    }
})