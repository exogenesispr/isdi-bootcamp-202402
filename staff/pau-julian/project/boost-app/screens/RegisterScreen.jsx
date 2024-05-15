import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import logic from '../logic'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import commonStyles from '../commonStyles'

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
        <View style={commonStyles.mainContainer}>
            <StatusBar style='auto' />
            <View style={styles.container}>
                <View style={commonStyles.container}>
                    <Text style={commonStyles.heading}>Register</Text>
                </View>
                <ScrollView style={styles.container}>
                    <TextInput style={commonStyles.input} placeholder='Username'
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput secureTextEntry={!showPassword} style={commonStyles.input} placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                    />
                    <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} style={styles.icon}
                        onPress={toggleShowPassword} />

                    <TextInput style={commonStyles.input} placeholder='Discord name'
                        value={dcName}
                        onChangeText={setDcName}
                    />

                    <View style={styles.languageContainer}>
                        <Text style={styles.text}>Languages:</Text>
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
                                <Text style={styles.languageText}>{lang}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
            </View>

            <Pressable onPress={handleRegisterTap} style={commonStyles.button}>
                <Text style={commonStyles.buttonText}>Register</Text>
            </Pressable>

        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    languageText: {
        fontWeight: 'bold'
    },
    icon: {
        position: 'absolute',
        right: 0,
        top: 72,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
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
        backgroundColor: '#f6f2f6'
    },
    disabledLanguage: {
        backgroundColor: '#b7a7ae'

    }
})