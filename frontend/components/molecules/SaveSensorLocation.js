import { useState } from 'react'
import variables from '../../env'
import InfoBox from '../atoms/InfoBox'
import InputBox from '../atoms/InputBox'
import Buttons from '../atoms/Buttons'
import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"

export default function saveSensorLocation({ location, setStatusText, locationURL, statusText }) {

    const { apiKey } = variables
    const [newLocation, setNewLocation] = useState('');

    const saveLocation = async() => {

      location = newLocation

        const response = await fetch(locationURL, {
           method: "POST",
           headers: { "Content-Type": "application/x-www-form-urlencoded" },
           body: `apiKey=${apiKey}&location=${newLocation}`,
         })
         
         if(response.status === 202) {
           setStatusText("Location switched")
         } else if (response.status === 403) {
           setStatusText("There was an error, Try again later")
         }
       }

  return (<>
    <InfoBox text = "Device location" textStyle = 'headingText' type = 'heading'/>  
        <InputBox placeholder= "where ..." text = { location } newText = { setNewLocation } onSubmitEditing={ saveLocation }/>
    <Buttons text = "save" type = "save" onPress={ saveLocation } />

    <View style = { styles.block}>
        <Text style = { styles.statusText }>{statusText}</Text>
      </View>
  </>)
}