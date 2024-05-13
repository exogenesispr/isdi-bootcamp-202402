import { View, Text, StyleSheet } from 'react-native'
import { useContext } from '../context'
import { FontAwesome6 } from '@expo/vector-icons'
import { util } from '../com/index.js'
import moment from 'moment'

const { priceFormatter } = util

export default function Header() {
    const { user, wowToken } = useContext()

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{user ? user.username : ''}</Text>

            <FontAwesome6 name='coins' size={24} style={styles.icon} />
            {wowToken && <View>
                <Text style={styles.headerText}>{priceFormatter(wowToken.price, true)}</Text>
                <Text style={styles.headerText}>{moment(wowToken.last_updated_timestamp).fromNow()}</Text>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        height: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '8'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        height: 30,
    }
})