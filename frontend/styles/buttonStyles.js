import { StyleSheet } from 'react-native'

export const buttons = StyleSheet.create({
    updateButton: {
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        borderWidth: 1,
        width: '95%',
        backgroundColor: 'lightblue',
    },
    startButton: {
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        width: '50%',
        backgroundColor: 'lightgrey',
    },
    saveButton: {
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        width: '95%',
        backgroundColor: 'green',
        borderWidth: 1,
    },
    refreshButton: {
        margin: 20,
        padding: 2,
        height: 50,
        width: 50,
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
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        width: '35%',
        backgroundColor: 'red',
        borderWidth: 1,
    },
    pinButton: {
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        width: '50%',
        backgroundColor: 'yellow',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
    },
});