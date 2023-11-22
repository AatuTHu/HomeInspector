import { View, Text, ScrollView} from "react-native"
import  variables  from "../../env"
import { styles } from "../../styles/styles"
import { useState } from "react"
import Buttons from "./atoms/Buttons"
import HeadingBox from "./atoms/HeadingBox"
import InfoBox from "./atoms/InfoBox"
import InputBox from "./atoms/InputBox"
import StatusBox from "./atoms/StatusBox"


export default function Control({ssid, location, setScreen}) {

  const { apiKey, locationURL, lightURL, startURL } = variables

  const [newLocation, setNewLocation] = useState("");
  const [statusText, setStatusText] = useState("")
  const [onTime, setOntime] = useState(0)
  const [start, setStart] = useState(false)
  const [lights, setLights] = useState(false)

  const lightSwitch = async() => {
    setLights(!lights)
    let mode = lights ?  0 : 1
    await fetch(lightURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `apiKey=${apiKey}&lightMode=${mode}`,
    }).then( res => {
      if(res.status === 200) {
        lights ? setStatusText("Lights Off") : setStatusText("Lights On")
      } else {
        setStatusText('There was an error, Try again later')
        setLights(false)
      }
    }).catch( error => {
      console.log(error)
    });
  }

  const saveLocation = async() => {
   await fetch(locationURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `apiKey=${apiKey}&location=${newLocation}`,
    }).then( res => {
      if(res.status === 200) {
        setStatusText("Location switched")
      } else {
        setStatusText('There was an error, Try again later')
      }
    }).catch( error => {
      console.log(error)
    });
  }

  const startMeasuring = async() => {
    setStart(!start)
    let mode = start? 0 : 1
    await fetch(startURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `apiKey=${apiKey}&measuringMode=${mode}`,
    }).then( res => {
      if(res.status === 200) {
        start ? setStatusText("Measurements stopped") : setStatusText("Measurements started")
      } else {
        setStatusText('There was an error, Try again later')
      }
    }).catch( error => {
      console.log(error)
    });
  }

  const showAll = () => { 
    setScreen(4);
  }

  const deleteAll = () => {
    
  }

  return (
    <>
    <ScrollView>
      <View style = { styles.controlContainer }>
        <HeadingBox text = "Wi-Fi ssid"/>
          <InfoBox text = { ssid }/>
            <HeadingBox text = "Device location"/>  
          <InputBox placeholder= 'where ...' text = { location } newText = { setNewLocation } onSubmitEditing={ saveLocation }/>
        <Buttons text = "save" type = "save" onPress={ saveLocation } />

      <View style = { styles.block}>
        <Text style = { styles.statusText }>{statusText}</Text>
      </View>

      <View style = { styles.buttonRowContainer }>
        <Buttons text = "start" type = "start" onPress={ startMeasuring }/>
          <StatusBox text = { onTime } />
      </View>

      <View style = { styles.buttonRowContainer }>
        <Buttons text = "Lights on/off" type = "start" onPress={ lightSwitch }/>
          <View style = { styles.statusBox }>
        <Text style = { styles.subHeading }>{lights ? (<Text style = {{"color" : "yellow"}} >On</Text>) : (<Text>Off</Text>)}</Text>
      </View>
      </View>

          <Buttons text = "See all the measurements" type = "update" onPress={ showAll }/>
        <Buttons text = "Delete measurements" type = "delete" onPress={ deleteAll }/>
      </View>
    </ScrollView>
  </>
  )
}