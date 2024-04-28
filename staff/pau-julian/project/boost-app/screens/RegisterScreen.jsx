import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import logic from '../logic'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [dcName, setDcName] = useState('')
    const [languages, setLanguages] = useState(['EN'])

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


    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Register</Text>

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
                    {Object.values(Language).map((lang) => (
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

            <Button title='Start' onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddin: 20
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
        top: 35
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