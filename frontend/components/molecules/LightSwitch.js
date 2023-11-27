import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"
import { useState } from 'react'
import Buttons from '../atoms/Buttons'
import variables from '../../env'

export default function LightSwitch() {

  const { apiKey,lightURL } = variables
  const [lights, setLights] = useState(false)

    const lightSwitch = async() => {
        console.log(lightURL)
        console.log(lights)
        
        let mode = lights ?  1 : 0
        console.log(mode)
        const response = await fetch('http://127.0.0.1:3001/lightMode', {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `apiKey=${apiKey}&lightMode=${mode}`,
        }).then((res) => {
          res.json()
        }
        ).catch(err => {
          console.log(response)
        })
        
        console.log(response.status)
        if(response.status === 202) {
          setLights(!lights)
        } else {
          console.log(response)
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