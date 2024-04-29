import { View, Text, ScrollView, StyleSheet } from 'react-native'

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}> HEADER </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'lightblue',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})