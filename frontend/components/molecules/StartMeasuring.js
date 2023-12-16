import { View, Text } from 'react-native'
import { lightStyles } from "../../styles/lightStyles"
import { useState, useEffect } from 'react'
import Buttons from '../atoms/Buttons'
import localVariables from '../../env'
import Icon from 'react-native-vector-icons/Feather'
import { darkStyles } from '../../styles/darkStyles'

export default function StartMeasuring({selected, isDarkTheme}) {

  const { apiKey, temperatureStartURL, humidityStartURL } = localVariables
  const [ started, setStarted ] = useState(false);

  useEffect(() => {
    async function fetchIsStarted() {
      let url = selected === 'humidity' ? humidityStartURL : temperatureStartURL;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setStarted(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
    fetchIsStarted();
  }, [selected]);
  

  const startMeasuring = async() => {
    
      let mode = started ? 0 : 1
      let url = selected === 'humidity' ? humidityStartURL : temperatureStartURL

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `apiKey=${apiKey}&measuringMode=${mode}`,
      }).catch((error) => { 
        console.log(error.message); 
      }); 
  
      if(response.status === 200) {
        setStarted(!started)
      } 
    }

  return (
    <View style = { lightStyles.buttonRowContainer }>
     <Buttons text = {<Icon name='play' size={30}/>} textStyle="white" type = "start" onPress={ startMeasuring }/>
        <View style = { isDarkTheme ? darkStyles.statusBox : lightStyles.statusBox }>
          <Text style = { isDarkTheme ? darkStyles.subHeadingText : lightStyles.subHeadingText }>{ started ? (<Text style = {{"color" : "green"}}>On</Text>) : (<Text>Off</Text>)}</Text>
        </View>
    </View>
  )
}