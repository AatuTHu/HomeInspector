import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { lightStyles } from "../../styles/lightStyles"
import Buttons from '../atoms/Buttons'
import localVariables from '../../env'
import Icon from 'react-native-vector-icons/Entypo'
import { darkStyles } from '../../styles/darkStyles'

export default function LightSwitch({isDarkTheme}) {

  const {apiKey,lightURL} = localVariables
  const [lights, setLights] = useState(false)

  useEffect(() => {
    async function fetchIsStarted() {
      try {
        const response = await fetch(lightURL);
        const data = await response.json();
        if (response.ok) {
          setLights(data);
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    fetchIsStarted();
  }, []);

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
        } else if (response.status = 403) {
          setLights(false)
        }
      }

  return (
    <View style = { lightStyles.buttonRowContainer }>
        <Buttons text = {<Icon name='light-bulb' size = {30}/>} textStyle="white" type = "start" onPress={ lightSwitch }/>
      <View style = { isDarkTheme ? darkStyles.statusBox : lightStyles.statusBox }>
          <Text style = { isDarkTheme ? darkStyles.subHeadingText : lightStyles.subHeadingText }>{lights ? (<Text style = {{"color" : "#A30015"}}>On</Text>) : (<Text>Off</Text>)}</Text>
      </View>
  </View>
  )
}