import { StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';

export const styles = StyleSheet.create({
title: {
  fontSize: 25,
  fontStyle: 'italic',
  color: '#ffff',
},
container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingTop: Constants.statusBarHeight,
},
controlContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
controlRowContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  borderTopWidth: 1,
  borderStyle: 'dashed',
  width: '100%',
  height: 230,
  marginTop: 15,
  marginBottom:15,
},
topBar:{
  height: '7%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "#3C6E71",
},
displayBox: {
  flex: 1,
  flexDirection: 'column',
  width: '100%',
  backgroundColor: '#FFFF',
},
navBar: {
  height: '10%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "#dbd7d7",
},
navContainer: {
  display: 'flex',
  flexDirection: 'row',
  width: '99%',
  justifyContent:'space-around',
},
dropDownBox: {
  width: '95%',
  alignSelf: 'center',
  backgroundColor: "#EEF0F2",
  margin: 10,
  borderRadius: 15,
},
headingBox:{
  width: '95%',
  height: 50,
  justifyContent: 'center',
  borderRadius: 22,
  marginTop: 20,
},
smallInfoBox: {
  width: '95%',
  height: 50,
  backgroundColor: '#E8F1F2',
  justifyContent: 'center',
  marginTop: 10,
},
dataContainer:{
  height: 250,
  width: '30%',
  overflow: 'hidden',
  backgroundColor: '#ffff',
  justifyContent: 'flex-end',
  marginHorizontal: 5,
  borderRadius: 60,
  borderWidth:2
},
textDataContainer:{
  height: 250,
  width: '50%',
  justifyContent: 'space-evenly',
},
mediumInfoBox: {
  display: 'flex',
  flexDirection: 'row',
  width: '95%',
  height: 270,
  borderRadius: 5, 
  backgroundColor: '#E8F1F2',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 20,
},
metricInfoBox: {
  display: 'flex',
  width: '45%',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: 10, 
  backgroundColor: '#E8F1F2',
  marginTop: 20,
  borderWidth: 1,
},
statusBox: {
  backgroundColor: '#D9E5D6',
  justifyContent: 'center',
  width: '30%',
  borderRadius: 22,
},
mercury: {
  backgroundColor: 'darkred',
}, 
headingText: {
  fontSize: 20,
  fontWeight: 'bold',
},
dropDownTextContainer: {  
  padding: 10,
  fontStyle: 'italic',
  backgroundColor: '#fff',
  borderRadius: 15,
  margin: 15
},
subHeadingText: {
  fontSize: 22,
  textAlign: 'center',
},
statusText: {
  fontSize: 20,
  padding: 10,
  textAlign: 'center',
  justifyContent: 'center',
  color: 'darkgreen',
},
metricText: {
  fontSize: 15,
  textAlign: 'center',
},
metricTextTitle: {
  fontSize: 19,
  textAlign: 'center',
  fontWeight: 'bold',
},
selectedText: {
  fontSize: 20,
  padding: 10,
  color: 'black',
  textAlign: 'center',
  opacity: 0.5
},
block : {
  height: 100,
  justifyContent: 'center',
},
buttonRowContainer: { 
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '95%',
  marginTop: 1,
  marginBottom: 20,
},
buttonColumnContainer: {
  display: 'flex',
  width: '30%',
  justifyContent: 'space-evenly',
},
});