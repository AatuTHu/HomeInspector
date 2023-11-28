import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"
import { useState } from 'react'
import Buttons from '../atoms/Buttons'
import localVariables from '../../env'

export default function LightSwitch({lights, setLights}) {

  const { apiKey,lightURL } = localVariables

    const lightSwitch = async() => {

        let mode = lights ?  0 : 1
        const response = await fetch(lightURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `apiKey=${apiKey}&lightMode=${mode}`,
        }).catch((error) => { 
          console.error(error.message); 
        }); 

        if(response.status === 200) {
          setLights(!lights)
        } else {
          
        }
      }

  return (
    <View style = { styles.buttonRowContainer }>
        <Buttons text = "lights" type = "start" onPress={ lightSwitch }/>
      <View style = { styles.statusBox }>
          <Text style = { styles.subHeadingText }>{lights ? (<Text style = {{"color" : "yellow"}}>On</Text>) : (<Text>Off</Text>)}</Text>
      </View>
  </View>
  )
}