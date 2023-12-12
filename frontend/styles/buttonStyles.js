import { StyleSheet } from 'react-native'

export const buttons = StyleSheet.create({
    updateButton: {
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        width: '95%',
        color: 'white',
        backgroundColor: '#03254E',
    },
    startButton: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        width: '50%',
        backgroundColor: '#03254E',
    },
    saveButton: {
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        width: '95%',
        backgroundColor: '#00A352',
        borderWidth: 1,
    },
    navButtons: {
        height: '100%',
        width: '33%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    deleteButton: {
        padding: 8,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#FF6542',
        borderWidth: 1,
    },
    unPinButton: {
        padding: 8,
        borderTopRightRadius: 9,
        backgroundColor: '#FF6542',
        borderBottomWidth: 1,
        borderLeftWidth:1 ,
        
    },
    pinSaveButton: {
        padding: 8,
        borderBottomRightRadius: 9,
        backgroundColor: '#00A352',
        borderTopWidth: 1,
        borderLeftWidth:1 ,
    },
    pinButton: {
        padding: 8,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#E3B23C',
        borderWidth: 1,
    },
    whiteButtonText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    blackButtonText: {
        fontSize: 22,
        color: '#001021',
        textAlign: 'center',
    },

});