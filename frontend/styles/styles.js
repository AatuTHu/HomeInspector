import { StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
    topBar:{
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "red",
    },
    displayBox: {
      height: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navBar: {
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#f4f4f4",
    },
    navContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent:'space-around',
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