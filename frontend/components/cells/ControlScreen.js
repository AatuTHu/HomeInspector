import { View, Text, ScrollView} from "react-native"
import { styles } from "../../styles/styles"
import  localVariables  from "../../env"
import { useState } from "react"
import Buttons from "../atoms/Buttons"
import SaveSensorLocation from "../molecules/SaveSensorLocation"
import DropDown  from "../molecules/DropDown"
import StartMeasuring from "../molecules/StartMeasuring"
import LightSwitch from "../molecules/LightSwitch"

export default function ControlScreen({setScreen,setTempStarted,tempStarted,setCurrentHumLoc,setCurrentTempLoc,currentHumLoc,currentTempLoc,setHumStarted,humStarted,setLights, lights}) {

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
      <View style = { styles.controlContainer }>
          <DropDown selected={selected} setSelected={setSelected} options={options}/>
          { selected ? (<>
            <SaveSensorLocation 
              selected = {selected} 
              setCurrentHumLoc = {setCurrentHumLoc} 
              setCurrentTempLoc = {setCurrentTempLoc} 
              currentHumLoc = {currentHumLoc} 
              currentTempLoc = {currentTempLoc}
            />
            <StartMeasuring 
              selected = {selected} 
              setTempStarted = { setTempStarted } 
              tempStarted = {tempStarted} 
              setHumStarted = { setHumStarted } 
              humStarted = {humStarted}
            />
          </>) : (<></>)}
       
          <LightSwitch lights = {lights} setLights = {setLights}/>
          <Buttons text = "See all the measurements" type = "update" onPress={ showAll }/>
      </View>
    </ScrollView>
  )
}