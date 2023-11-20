import { StyleSheet } from 'react-native'

export const inputs = StyleSheet.create({
    inputCointainer: {
        width: '90%',  
    },
    input_row_Container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputTexts: {
        padding: 10,
        fontSize: 17,
        textAlign: 'center',
    },
    inputs_with_dots: {
        width: '60%',
        padding: 5,
        fontSize: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 6,
    },
    inputs_without_dots: {
        width: '76%',
        padding: 5,
        fontSize: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 6,
    },
    inputs_profile: {
        width: '100%',
        padding: 5,
        fontSize: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 6,
    },
    inputs_profile_text: {
        padding: 10,
        fontSize: 17,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 15,
        textAlign: 'left',
        backgroundColor: 'lightgrey',
    },
});