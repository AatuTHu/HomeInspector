import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"
import { useState, useEffect } from 'react'
import Buttons from '../atoms/Buttons'
import localVariables from '../../env'

export default function StartMeasuring({selected,setTempStarted,tempStarted,setHumStarted,humStarted}) {

  const { apiKey, temperatureStartURL, humidityStartURL } = localVariables
  const [ started, setStarted ] = useState(false);

  useEffect(() => {
    async function fetchIsStarted () {
      let url = selected === 'humidity' ? humidityStartURL : temperatureStartURL

      const response = await fetch(url).then((res)=>
       res.json()
     ).catch((error) => { 
       console.log(error.message); 
     })

     if(response !== undefined) {
        setStarted(response)
     }
    }
   fetchIsStarted()
  }, [])

  const startMeasuring = async() => {
    
      let mode = started ? 0 : 1
      let url = selected === 'humidity' ? humidityStartURL : temperatureStartURL

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `apiKey=${apiKey}&measuringMode=${mode}`,
      }).catch((error) => { 
        console.error(error.message); 
      }); 
  
      if(response.status === 200) {
        setStarted(!started)
        selected === 'humidity' ? setHumStarted(!humStarted) : setTempStarted(!tempStarted)
      } 
    }

  return (
    <View style = { styles.buttonRowContainer }>
     <Buttons text = "Start" textStyle="white" type = "start" onPress={ startMeasuring }/>
        <View style = { styles.statusBox }>
          <Text style = { styles.subHeadingText }>{ started ? (<Text style = {{"color" : "green"}}>On</Text>) : (<Text>Off</Text>)}</Text>
        </View>
    </View>
  )
}