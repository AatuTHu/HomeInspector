import { View, Text, ScrollView} from "react-native"
import { styles } from "../../styles/styles"
import  variables  from "../../env"
import { useState } from "react"
import Buttons from "../atoms/Buttons"
import SaveSensorLocation from "../molecules/SaveSensorLocation"
import DropDown  from "../molecules/DropDown"
import StartMeasuring from "../molecules/StartMeasuring"
import LightSwitch from "../molecules/LightSwitch"

export default function ControlScreen({temperatureLocation,humidityLocation,setScreen}) {

  const { humidityLocationURL,humidityStartURL,temperatureStartURL,temperatureLocationURL, lightURL} = variables

  let location
  let startURL
  let locationURL

  const [statusText, setStatusText] = useState("")
  const [selected, setSelected] = useState("")
  
  const showAll = () => { 
    setScreen(4);
  }

  const deleteAll = () => {
    
  }

  if(selected === 'temperature') {
    location = temperatureLocation
    startURL = temperatureStartURL
    locationURL = temperatureLocationURL 
  } else if (selected === 'humidity') {
    location = humidityLocation
    startURL = humidityStartURL
    locationURL = humidityLocationURL
  }

  return (
    <>
    <ScrollView>
      <View style = { styles.controlContainer }>
          <DropDown selected={selected} setSelected={setSelected} location = { location }/>
        <SaveSensorLocation location={location} setStatusText = { setStatusText } statusText = {statusText} locationURL = { locationURL }/>
      
      <StartMeasuring setStatusText = { setStatusText } startURL={startURL}/>
        <LightSwitch setStatusText = { setStatusText } lightURL={lightURL}/>
    
          <Buttons text = "See all the measurements" type = "update" onPress={ showAll }/>
        <Buttons text = "Delete measurements" type = "delete" onPress={ deleteAll }/>
      </View>
    </ScrollView>
  </>
  )
}