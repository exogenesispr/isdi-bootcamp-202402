import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { util } from '../com/index.js'
import moment from 'moment'

export default function Service({ service, navigation }) {
    const { getBackgroundColor, priceFormatter } = util

    const onPressServiceHandler = () => {
        navigation.navigate('Provider', { id: service.id })
    }

    return (
        <TouchableOpacity
            style={[
                styles.item,
                { backgroundColor: getBackgroundColor(service.name) }
            ]}
            onPress={onPressServiceHandler}
        >
            <Text style={styles.text}>{service.name}</Text>
            <Text style={styles.text}>{priceFormatter(service.price.value)}</Text>
            <Text style={styles.text}>{moment(service.price.lastEdited).format('HH:mm DD/MM')}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#ffffff'
    }
})