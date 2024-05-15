import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
    // Layout and general styles
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 70,
        alignItems: 'center',
        backgroundColor: '#e1d5d9',
        color: '#f2f6f2'
    },
    container: {
        backgroundColor: '#e1d5d9',
        alignItems: 'center',
        marginBottom: 30,
    },
    pressedButton: {
        backgroundColor: '#d8d8ff'
    },

    // Button styles
    button: {
        backgroundColor: '#58545B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Heading and text styles
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },

    // Filter styles
    languageFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterLabel: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    filterOption: {
        marginRight: 10,
        color: '#666',
    },
    activeFilter: {
        color: 'blue',
        fontWeight: 'bold',
    },

    // Row styles
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    // Service styles
    serviceContainer: {
        flex: 1,
        width: '100%',
    },
    serviceBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 16,
    },
    serviceDate: {
        fontSize: 12,
        color: '#666',
    },
    serviceText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    serviceValue: {
        fontSize: 14,
        marginBottom: 5,
    },

    // Item styles
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#ffffff'
    },
    icon: {
        height: 30,
        width: 30,
    },

    // Specific component styles
    m10: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    raidVip: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    raidUnsaved: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    raidSaved: {
        width: '48%',
        height: 250,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },

    // Input styles
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#f6f2f6'
    },
    copyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    copiedText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    // Additional styles
    headingTitle: {
        fontSize: 24,
        fontWeight: 'bold',
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
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
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
})

export default commonStyles