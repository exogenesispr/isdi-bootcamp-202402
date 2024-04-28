import { View, Text, StyleSheet, Button } from 'react-native'

function UserScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>User screen</Text>
            <Button title='Edit' onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})