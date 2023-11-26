import React from 'react'
import { View,ScrollView  } from 'react-native'
import { styles } from '../../styles/styles'
import DataCard from '../atoms/DataCard'
import Buttons from '../atoms/Buttons'
import InfoBox from '../atoms/InfoBox'

export default function HomeScreen({temperature, humidity}) {

  const refreshData = () => {
 
  }

  if(temperature === undefined && humidity === undefined) {
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
            {temperature !== undefined ? <>
            {temperature.map ( (temperature ) => { return (<View key = {temperature.id}>
            <DataCard 
              data = { temperature.temperature } 
              location= {temperature.location} 
              time= {''}
              dataType = 'temperature' 
              fillingColor= 'lightblue'
              unit = '°C'/></View>)})}
            </> : <></>}
            
            {humidity !== undefined ? <>
             {humidity.map ( (humidity) => { return (<View key = {humidity.id}>
            <DataCard 
              data = { humidity.humidity } 
              location={humidity.location} 
              time={''}
              dataType = 'humidity'
              fillingColor = 'darkblue'
              unit = '%'/></View>)})}
             </> : <></>}
            
          <Buttons type = 'update' onPress = { refreshData } text = 'Refresh'/>
          </View>
        </ScrollView>
      )}
}