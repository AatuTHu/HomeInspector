import { useState } from 'react'
import variables from '../../env'
import InfoBox from '../atoms/InfoBox'
import InputBox from '../atoms/InputBox'
import Buttons from '../atoms/Buttons'
import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"
import Icon from "react-native-vector-icons/AntDesign"

export default function saveSensorLocation({selected, setCurrentHumLoc, setCurrentTempLoc, currentHumLoc, currentTempLoc}) {

    const {apiKey, temperatureLocationURL, humidityLocationURL} = variables
    const [newLocation, setNewLocation] = useState('');
    const [statusText, setStatusText] = useState('');

    const saveLocation = async() => {

       const url = selected === "humidity" ? humidityLocationURL : temperatureLocationURL 

        const response = await fetch(url, {
           method: "POST",
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
           body: `apiKey=${apiKey}&location=${newLocation}`,
         }).catch((error) => { 
          console.log(error.message); 
        }); 
         
         if(response.status === 202) {
           setStatusText("Location saved")
           selected === "humidity" ? setCurrentHumLoc(newLocation) : setCurrentTempLoc(newLocation)
           const timeout = setTimeout(() => {
            setStatusText("");
          }, 3000);
   
          return () => clearTimeout(timeout);
         } else if (response.status === 403) {
           setStatusText("There was an error, Try again later")
           const timeout = setTimeout(() => {
            setStatusText("");
          }, 3000);
   
          return () => clearTimeout(timeout);
         }
       }

    let rememberLocation = selected === "humidity" ? currentHumLoc : currentTempLoc

  return (<>
    <InfoBox text = "Device location" textStyle = 'headingText' type = 'heading'/>  
        <InputBox placeholder= "update location" text = {rememberLocation} newText = { setNewLocation } onSubmitEditing={ saveLocation }/>
    <Buttons text = {<Icon name='save' size={35} color={'white'}/>} textStyle="white" type = "save" onPress={ saveLocation } />
    <View style = { styles.block}>
        <Text style = { styles.statusText }>{statusText}</Text>
    </View>
  </>)
}