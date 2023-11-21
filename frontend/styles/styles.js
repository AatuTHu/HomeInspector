import { StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
    },
    controlContainer: {    
      justifyContent: 'center',
      alignItems: 'center',
    },
    topBar:{
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "red",
    },
    displayBox: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
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
    headingBoxes:{
      width: '95%',
      height: 50,
      justifyContent: 'center',
      borderRadius: 22,
      marginTop: 20,
    },
    infoBoxes: {
      width: '95%',
      height: 50,
      backgroundColor: 'lightgrey',
      justifyContent: 'center',
      marginTop: 10,
    },
    statusBox: {
      backgroundColor: 'lightgrey',
      justifyContent: 'center',
      width: '30%',
      borderRadius: 22,
    },
    headingText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subHeading: {
      fontSize: 20,
      textAlign: 'center',
    },
    block : {
      height: 100,
    },
    buttonRowContainer: { 
      width: '95%',
      marginTop: 25,
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  });