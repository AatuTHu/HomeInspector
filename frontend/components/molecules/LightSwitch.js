import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"
import { useState } from 'react'
import Buttons from '../atoms/Buttons'
import variables from '../../env'

export default function LightSwitch() {

  const { apiKey,lightURL } = variables
  const [lights, setLights] = useState(false)

    const lightSwitch = async() => {
        
        let mode = lights ?  1 : 0
    
        const response = await fetch(lightURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `apiKey=${apiKey}&lightMode=${mode}`,
        })
    
        if(response.status === 202) {
          setLights(!lights)
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