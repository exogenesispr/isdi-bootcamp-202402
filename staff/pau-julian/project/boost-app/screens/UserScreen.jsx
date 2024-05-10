import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Switch, TextInput, ActivityIndicator, Alert } from 'react-native'
import { useContext } from '../context'
import { MaterialIcons } from '@expo/vector-icons'
import logic from '../logic'

function UserScreen({ navigation }) {
    const { user, stamp, setStamp } = useContext()
    const [priceValue, setPriceValue] = useState(user.price.m10.value)
    const [isOnline, setIsOnline] = useState(user.online)
    const isOnlineRef = useRef(user.online)

    useEffect(() => {
        isOnlineRef.current = isOnline
    }, [isOnline])

    const handleEditPress = () => {
        return logic.modifyUserPrice(priceValue)
            .then(() => {
                return logic.modifyUserOnlineStatus(isOnlineRef.current)
                    .then(() => {
                        console.log(stamp)
                        setStamp(Date.now())
                        Alert.alert('Success', 'Profile updated successfully!')
                    })
                    .catch((error) => {
                        Alert.alert('Error updating online status', error.message)
                        console.error(error)
                    })
            })
            .catch((error) => {
                Alert.alert('Error updating price', error.message)
                console.error(error)
            })
    }

    const handleLogoutPress = () => {
        logic.logoutUser()
        setStamp(Date.now())
    }

    if (!user) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.heading}>User profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{user.username}</Text>
                <Text style={styles.label}>Discord Username:</Text>
                <Text style={styles.value}>{user.dcName}</Text>
            </View>
            <View style={styles.editContainer}>
                <Text style={styles.label}>Edit your data</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setPriceValue}
                    value={priceValue.toString()}
                    inputMode='numeric'
                />
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isOnline ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={(value) => (setIsOnline(value))}
                    value={isOnline}
                />
                <Pressable style={styles.button} onPress={handleEditPress}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </Pressable>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Logout: </Text>
                <MaterialIcons name="logout" size={24} color="black" onPress={handleLogoutPress} />
            </View>

        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    editContainer: {
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#E69561',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})