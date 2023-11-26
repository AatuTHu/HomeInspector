import { View, Text } from 'react-native'
import { styles } from "../../styles/styles"
import { useState } from 'react'
import Buttons from '../atoms/Buttons'
import variables from '../../env'

export default function StartMeasuring({startURL}) {

  const { apiKey } = variables
  const [start, setStart] = useState(false)

  const startMeasuring = async() => {
    
      let mode = start? 1 : 0
  
      const response = await fetch(startURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `apiKey=${apiKey}&measuringMode=${mode}`,
      })
  
      if(response.status === 202) {
        setStart(!start)
      }
    }

  return (
    <View style = { styles.buttonRowContainer }>
     <Buttons text = "start" type = "start" onPress={ startMeasuring }/>
        <View style = { styles.statusBox }>
          <Text style = { styles.subHeadingText }>{start ? (<Text style = {{"color" : "green"}}>On</Text>) : (<Text>Off</Text>)}</Text>
        </View>
    </View>
  )
}