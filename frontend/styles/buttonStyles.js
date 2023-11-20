import { StyleSheet } from 'react-native'

export const buttons = StyleSheet.create({
    button_row_container: { 
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
    },
    inputButton: {
        width: '10%',
        marginLeft: '2%',
        backgroundColor:'grey',
        borderRadius: 20,
    },
    buttonTexts: {
        padding: 4,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    switchButtonText: {
        padding: 4,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    signUpButton: {
        padding: 5,
        fontSize: 12,
        width: '40%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'orange',
    },
    loginButton: {
        padding: 5,
        fontSize: 12,
        width: '40%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'blue',
    },
    updateButton: {
        padding: 5,
        fontSize: 12,
        marginTop: 15,
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'blue',
    },
    deleteButton: {
        padding: 5,
        fontSize: 12,
        marginTop: 15,
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'red',
    },
    signOutButton: {
        padding: 5,
        fontSize: 12,
        marginTop: 15,
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'orange',
    },
    navButtons: {
        height: '100%',
        width: '33%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
      }
});