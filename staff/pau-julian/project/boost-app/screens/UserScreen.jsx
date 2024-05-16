import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Switch, TextInput, ActivityIndicator, Alert, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { useContext } from '../context'
import { MaterialIcons } from '@expo/vector-icons'
import logic from '../logic'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import commonStyles from '../commonStyles'

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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 60}
            style={commonStyles.mainContainer}
        >
            <StatusBar />

            <Header />

            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Profile</Text>
                </View>

                <View style={styles.userDataContainer}>
                    <Image
                        source={require('../assets/icons/useravataricon.png')}
                        style={styles.bigIcon}
                    />

                    <View style={styles.infoContainer}>
                        <Text style={styles.headingLabel}>Username:</Text>
                        <Text style={styles.value}>{user.username}</Text>
                        <Text style={styles.headingLabel}>Discord Username:</Text>
                        <Text style={styles.value}>{user.dcName}</Text>
                    </View>
                </View>
                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Set your Mythic 10 price:</Text>

                    <View style={styles.editContainer}>
                        <View style={styles.containerRow}>
                            <View style={styles.containerCenter}>
                                <Text style={styles.textPriceSet}>Your price:</Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={setPriceValue}
                                    value={priceValue.toString()}
                                    keyboardType='numeric'
                                />
                            </View>
                            <View style={styles.containerCenter}>
                                <View style={styles.containerRow}>
                                    <Text style={styles.switchTagText}>Offline</Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#B7A7AE' }}
                                        thumbColor={isOnline ? '#58545B' : '#f4f3f4'}
                                        onValueChange={(value) => (setIsOnline(value))}
                                        value={isOnline}
                                    />
                                    <Text style={styles.switchTagText}>Online</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <Pressable style={styles.button} onPress={handleEditPress}>
                                <Text style={styles.buttonText}>Save Changes</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </ScrollView>
            <Pressable style={styles.logoutPressable} onPress={handleLogoutPress}>
                <MaterialIcons name="logout" size={36} color="black" />
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between'
    },
    userDataContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    infoContainer: {
        paddingLeft: 30,
        marginBottom: 20,
    },
    logoutPressable: {
        position: 'absolute',
        top: 160,
        right: 10,
        padding: 10,
    },
    columnContainer: {
        flexDirection: 'column',
        padding: 20,
        width: '96%',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bigIcon: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    headingLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    editContainer: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#58545B',
        borderRadius: 10,
        backgroundColor: '#f6f2f6',
        padding: 16,
    },
    containerRow: {
        width: '96%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerCenter: {
        width: '45%',
        justifyContent: 'center',
    },
    textPriceSet: {
        textAlign: 'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    switch: {
        backgroundColor: 'red',
        padding: 10,
    },
    switchTagText: {
        color: '#58545B',
        fontWeight: 'bold',
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#58545B',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#58545B',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})