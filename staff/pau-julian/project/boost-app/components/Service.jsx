import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { util } from '../com/index.js'
import moment from 'moment'

export default function Service({ service, navigation, serviceType }) {
    const { getBackgroundColor, priceFormatter } = util

    const onPressServiceHandler = () => {
        navigation.navigate('Provider', { id: service.id })
    }

    return (
        <View>
            {/* <Text>{JSON.stringify(service)} SEPARATOR</Text>
            <Text>{JSON.stringify(serviceType)}</Text> */}
            <Pressable
                style={[
                    styles.item,
                    { backgroundColor: getBackgroundColor(service) }
                ]}
                onPress={onPressServiceHandler}
            >
                <Text style={styles.text}>{service.name}</Text>
                <Text style={styles.text}>{priceFormatter(service.price[serviceType].value)}</Text>
                <Text style={styles.text}>{moment(service.price[serviceType].lastEdited).format('HH:mm DD/MM')}</Text>
            </Pressable>
        </View>
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