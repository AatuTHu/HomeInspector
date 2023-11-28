import React from 'react'
import { View,ScrollView  } from 'react-native'
import { styles } from '../../styles/styles'
import DataCard from '../atoms/DataCard'
import Buttons from '../atoms/Buttons'
import InfoBox from '../atoms/InfoBox'

export default function HomeScreen({latestTemperature, latestHumidity}) {

  const refreshData = () => {
 
  }

  if(latestTemperature === undefined && latestHumidity === undefined) {
      return(
      <>
        <View style = { styles.controlContainer }>
          <InfoBox text = "No measurements found" type = "small" textStyle='subHeadingText'/>
        </View>
      </>
    )
  } else { 
    return (
        <ScrollView>
          <View style = { styles.controlContainer }>
            {latestTemperature !== undefined ? <>
            <DataCard 
              data = {latestTemperature.temperature} 
              location= {latestTemperature.location} 
              time={latestTemperature.time}
              date={latestTemperature.date}
              dataType = 'temperature' 
              fillingColor= 'lightblue'
              unit = '°C'/>
            </> : <></>}
            
            {latestHumidity ? <>           
            <DataCard 
              data = {latestHumidity.humidity} 
              location={latestHumidity.location} 
              time={latestHumidity.time}
              date={latestHumidity.date}
              dataType = 'humidity'
              fillingColor = 'darkblue'
              unit = '%'/>
             </> : <></>}
            
          <Buttons type = 'update' onPress = { refreshData } text = 'Refresh'/>
          </View>
        </ScrollView>
      )}
}