import React from 'react'
import { View,ScrollView } from 'react-native'
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
          <Buttons type = 'update' textStyle="white" onPress = { refreshData } text = 'Refresh'/>
        </View>
      </>
    )
  } else { 
    return (
        <ScrollView>
          <View style = { styles.controlContainer }>
          <InfoBox text = "Latest Measurements" type = "heading" textStyle='subHeadingText'/>
            {latestTemperature !== undefined ? <>
            <DataCard 
              data = {latestTemperature.temperature} 
              location= {latestTemperature.location} 
              time={latestTemperature.time}
              date={latestTemperature.date}
              title = "Temperature"
              dataType = 'temperature' 
              fillingColor= '#880D1E'
              unit = '°C'/>
            </> : <></>}
            
            {latestHumidity ? <>           
            <DataCard 
              data = {latestHumidity.humidity} 
              location={latestHumidity.location} 
              time={latestHumidity.time}
              date={latestHumidity.date}
              title = "Humidity"
              dataType = 'humidity'
              fillingColor = '#D1495B'
              unit = '%'/>
             </> : <></>}
            
          <Buttons type = 'update' textStyle="white" onPress = { refreshData } text = 'Refresh'/>
          </View>
        </ScrollView>
      )}
}