import { View, Text, ScrollView} from "react-native"
import  variables  from "../../env"
import { styles } from "../../styles/styles"
import { useState } from "react"
import Buttons from "./atoms/Buttons"
import HeadingBox from "./atoms/HeadingBox"
import InfoBox from "./atoms/InfoBox"
import InputBox from "./atoms/InputBox"
import StatusBox from "./atoms/StatusBox"


export default function Control({ssid, location}) {

  const { apiKey } = variables

  const [onTime, setOntime] = useState(0)
  const [lights, setLights] = useState(false)

  const lightSwitch = async() => {
    setLights(!lights)
    let lightMode
    lights ? lightMode = 1 : lightMode = 0
    const response = await fetch('http://192.168.100.127:3001/lightSwitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `apiKey=${apiKey}&lights=${lightMode}`,
    });
  }

  const saveLocation = () => {

  }

  const startMeasuring = () => {

  }

  const showAll = () => { 

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
          <InputBox placeholder= 'where ...' location = { location } />
        <Buttons text = "save" type = "save" onPress={ saveLocation } />

      <View style = { styles.block}/>

      <View style = { styles.buttonRowContainer }>
        <Buttons text = "start" type = "start" onPress={ startMeasuring } />
          <StatusBox text = { onTime } />
      </View>

      <View style = { styles.buttonRowContainer }>
        <Buttons text = "Lights on/off" type = "start" onPress={ lightSwitch }/>
          <View style = { styles.statusBox }>
        <Text style = { styles.subHeading }>{lights ? (<Text style = {{"color" : "yellow"}} >On</Text>) : (<Text>Off</Text>)}</Text>
      </View>
      </View>

          <Buttons text = "All the measurements" type = "update" onPress={ showAll }/>
        <Buttons text = "Delete all the measurements" type = "delete" onPress={ deleteAll }/>
      </View>
    </ScrollView>
  </>
  )
}