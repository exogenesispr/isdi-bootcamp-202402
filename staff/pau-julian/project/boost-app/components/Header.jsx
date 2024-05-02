import { View, Text, StyleSheet } from 'react-native'
import { useContext } from '../context'
import { FontAwesome6 } from '@expo/vector-icons'

export default function Header() {
    const { user, wowToken } = useContext()

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{user ? user.username : 'unknown user'}</Text>

            <FontAwesome6 name={'coins'} style={styles.icon} />
            <Text style={styles.headerText}>TOKEN</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'lightblue',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    icon: {
        height: 30,
    }
})