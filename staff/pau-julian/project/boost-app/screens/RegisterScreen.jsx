import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import logic from '../logic'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [dcName, setDcName] = useState('')
    const [languages, setLanguages] = useState(['EN'])

    const languagesDisplay = ['EN', 'ES', 'IT', 'DE', 'PT', 'RU']

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLanguageToggle = (language) => {
        if (languages.includes(language)) {
            setLanguages(languages.filter((lang) => lang !== language))
        } else {
            setLanguages([...languages, language])
        }
    }

    const handleRegisterTap = () => {
        try {
            logic.registerUser(username, password, dcName, languages)
                .then(() => {
                    setUsername('')
                    setPassword('')
                    setDcName('')
                    setLanguages('EN')
                    navigation.navigate('Login')
                })
                .catch((error) => Alert.alert(error.message))
        } catch (error) {
            Alert.alert(error.message)
        }
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar style='auto' />
            <Text style={styles.heading}>Register</Text>

            <ScrollView style={styles.container}>
                <TextInput style={styles.input} placeholder='Username'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput secureTextEntry={!showPassword} style={styles.input} placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                />
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} style={styles.icon}
                    onPress={toggleShowPassword} />

                <TextInput style={styles.input} placeholder='Discord name'
                    value={dcName}
                    onChangeText={setDcName}
                />

                <View style={styles.languageContainer}>
                    <Text style={styles.heading}>Languages:</Text>
                    {languagesDisplay.map((lang) => (
                        <TouchableOpacity key={lang}
                            style={[
                                styles.language,
                                languages.includes(lang) && styles.selectedLanguage,
                                lang === 'EN' && styles.disabledLanguage
                            ]}
                            onPress={() => handleLanguageToggle(lang)}
                            disabled={lang === 'EN'}
                        >
                            <Text>{lang}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            <Button title='Register' onPress={handleRegisterTap} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    container: {
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 72
    },
    headingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    heading: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    languageContainer: {
        marginBottom: 20
    },
    language: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10
    },
    selectedLanguage: {
        backgroundColor: 'lightblue'
    },
    disabledLanguage: {
        backgroundColor: 'tomato'
    }
})