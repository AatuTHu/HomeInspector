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

  const { humidityLocationURL,humidityStartURL,temperatureStartURL,temperatureLocationURL} = variables

  const options = [
    {id : 1 ,name : "humidity", value : "humidity"},
    {id : 2, name : "temperature", value : "temperature"}
  ]

  let location
  let startURL
  let locationURL

  const [selected, setSelected] = useState("")
  
  const showAll = () => { 
    setScreen(4);
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
    <ScrollView>
      <View style = { styles.controlContainer }>
          <DropDown selected={selected} setSelected={setSelected} location = { location } options={options}/>
          { selected ? (<>
            <SaveSensorLocation location={location} locationURL = { locationURL }/>
              <StartMeasuring startURL={startURL}/>
          </>) : (<></>)}
       
          <LightSwitch/>
          <Buttons text = "See all the measurements" type = "update" onPress={ showAll }/>
      </View>
    </ScrollView>
  )
}