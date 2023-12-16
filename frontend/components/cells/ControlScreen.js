import { View, Text, ScrollView} from "react-native"
import { lightStyles } from "../../styles/lightStyles"
import { useState } from "react"
import Buttons from "../atoms/Buttons"
import SaveSensorLocation from "../molecules/SaveSensorLocation"
import DropDown  from "../molecules/DropDown"
import StartMeasuring from "../molecules/StartMeasuring"
import LightSwitch from "../molecules/LightSwitch"

export default function ControlScreen({setScreen,setCurrentHumLoc,setCurrentTempLoc,currentHumLoc,currentTempLoc, setIsDarkTheme,isDarkTheme}) {

  const options = [
    {id : 1 ,name : "humidity", value : "humidity"},
    {id : 2, name : "temperature", value : "temperature"}
  ]

  const [selected, setSelected] = useState("")
  
  const showAll = () => { 
    setScreen(4);
  }

  return (
    <ScrollView>
      <View style = { lightStyles.controlContainer }>
          <DropDown selected={selected} setSelected={setSelected} options={options} isDarkTheme={isDarkTheme}/>
          { selected !== "" ? (<>
            <SaveSensorLocation 
              selected = {selected} 
              setCurrentHumLoc = {setCurrentHumLoc} 
              setCurrentTempLoc = {setCurrentTempLoc} 
              currentHumLoc = {currentHumLoc} 
              currentTempLoc = {currentTempLoc}
              isDarkTheme = {isDarkTheme}
            />
            <StartMeasuring 
              selected = {selected} 
              isDarkTheme={isDarkTheme}
            />
          </>) : (<></>)}
       
          <LightSwitch isDarkTheme={isDarkTheme}/>
          <Buttons textStyle="white" text = "See all the measurements" type = "metrics" onPress={ showAll }/>
          <Buttons textStyle="white" text = "Theme" type = "metrics" onPress={ () => setIsDarkTheme(!isDarkTheme) }/>
      </View>
    </ScrollView>
  )
}