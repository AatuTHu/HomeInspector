import { View,ScrollView  } from 'react-native'
import React from 'react'
import { styles } from '../../styles/styles'
import DataCard from './atoms/DataCard'
import Buttons from './atoms/Buttons'

export default function HomeScreenScreen({temperature, location, time}) {

  temperature = 26
  humidity = 21.23
  location = 'Living Room'
  time = '12 am'

  const refreshData = () => {

  }

  return (
    <>
      <ScrollView>
        <View style = { styles.controlContainer }>
          <DataCard 
          data = { temperature } 
          location={location} 
          time={time} 
          dataType = 'temperature' 
          fillingColor= 'lightblue'
          unit = '°C'/>

          <DataCard 
          data = { humidity } 
          location={location} 
          time={time} 
          dataType = 'humidity'
          fillingColor = 'darkblue'
          unit = '%'
          />
        <Buttons type = 'update' onPress = { refreshData } text = 'refresh'/>
        </View>
      </ScrollView>
    </>
  )
}