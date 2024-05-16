import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { util } from '../com/index.js'
import moment from 'moment'
import commonStyles from '../commonStyles.js'

export default function Service({ service, navigation, serviceType }) {
    const { getBackgroundColor, priceFormatter, getServiceImage } = util

    const onPressServiceHandler = () => {
        navigation.navigate('Provider', { id: service.id })
    }

    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.item,
                    { backgroundColor: getBackgroundColor(service) }
                ]}
                onPress={onPressServiceHandler}
            >
                <View style={commonStyles.row}>
                    <View style={styles.container}>
                        <Image
                            source={getServiceImage(service)}
                            style={styles.icon}
                        />
                        <Text style={styles.serviceText}>{service.name ? service.name : service.username}</Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.serviceText}>Price:</Text>
                        <Text style={styles.serviceValue}>{priceFormatter(service.price[serviceType].value)}</Text>
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.serviceDate}>Last updated:</Text>
                        <Text style={styles.serviceDate}>{moment(service.price[serviceType].lastEdited).format('HH:mm DD/MM')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
    serviceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    serviceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    serviceDate: {
        fontSize: 12,
        color: 'black',
        textAlign: 'right',
    },
    icon: {
        height: 45,
        width: 45,
        marginBottom: 5,
    },
    container: {
        alignItems: 'center',
        textAlign: 'right',
        width: '33%'
    },
    dateContainer: {
        flexDirection: 'column',
        alignItems: 'end',
        width: '33%'
    }
})