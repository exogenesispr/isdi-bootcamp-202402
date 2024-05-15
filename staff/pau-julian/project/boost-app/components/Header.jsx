import { View, Text, StyleSheet, Image } from 'react-native'
import { useContext } from '../context'
import { FontAwesome6 } from '@expo/vector-icons'
import { util } from '../com/index.js'
import moment from 'moment'
import commonStyles from '../commonStyles'

const { priceFormatter } = util

export default function Header() {
    const { user, wowToken } = useContext()

    return (
        <View style={styles.headerContainer}>
            <View style={styles.row}>
                <Image
                    style={styles.logoIcon}
                    source={require('../assets/icons/logo-pau.png')}
                    resizeMode='contain'
                />
                <Text style={styles.headerText}>{user ? user.username : ''}</Text>
            </View>

            <View style={styles.row}>
                <Image
                    style={styles.wowTokenIcon}
                    source={require('../assets/icons/moneda-wow.png')}
                    resizeMode='contain'
                />
                {wowToken && <View style={styles.container}>
                    <Text style={styles.wowTokenText}>{priceFormatter(wowToken.price, true)}</Text>
                    <Text style={styles.wowTokenDate}>{moment(wowToken.last_updated_timestamp).fromNow()}</Text>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#B7A7AE',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoIcon: {
        height: 60,
        width: 60,
        marginRight: 5,
    },
    wowTokenIcon: {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    container: {
        marginRight: 10,
    },
    wowTokenText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    wowTokenDate: {
        fontSize: 12,
        color: '#e1d5d9',
        textAlign: 'right',
    },
})