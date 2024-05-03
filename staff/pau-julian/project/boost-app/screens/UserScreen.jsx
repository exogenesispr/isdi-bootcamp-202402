import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, Switch, TextInput } from 'react-native'
import { useContext } from '../context'
import logic from '../logic'

function UserScreen({ navigation }) {
    const { user, setStamp } = useContext()
    const [isOnline, setIsOnline] = useState(user.online)
    const [priceValue, setPriceValue] = useState(user.price.m10.value)

    const toggleSwitch = () => setIsOnline(previousState => !previousState)

    const handleEditPress = () => {
        return logic.modifyUserPrice(priceValue)
            .then(() => logic.modifyUserOnlineStatus(isOnline))
            .then(() => {
                setStamp(Date.now())
                Alert.alert('Success', 'Profile updated successfully!')
            })
            .catch((error) => Alert.alert('Error updating data', error))
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>User screen</Text>
            <View style={styles.container}>
                <Text>{user.username}</Text>
                <Text>{user.dcName}</Text>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setPriceValue}
                    value={priceValue}
                    keyboardType='numeric'
                />
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isOnline ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isOnline}
                />
                <Button style={styles.button} onPress={handleEditPress}>Save Changes</Button>
            </View>
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