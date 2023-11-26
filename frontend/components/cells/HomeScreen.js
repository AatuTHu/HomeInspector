import React from 'react'
import { View,ScrollView  } from 'react-native'
import { styles } from '../../styles/styles'
import DataCard from '../atoms/DataCard'
import Buttons from '../atoms/Buttons'
import InfoBox from '../atoms/InfoBox'

export default function HomeScreen({temperature, humidity, location, time}) {


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
      <>
        <ScrollView>
          <View style = { styles.controlContainer }>
            {temperature !== undefined ? <>
              <DataCard 
            data = { temperature } 
            location={location} 
            time={time}
            dataType = 'temperature' 
            fillingColor= 'lightblue'
            unit = '°C'/>
            </> : <></>}
            
            {humidity !== undefined ? <>
            <DataCard 
            data = { humidity } 
            location={location} 
            time={time}
            dataType = 'humidity'
            fillingColor = 'darkblue'
            unit = '%'/>
            </> : <></>}
            
          <Buttons type = 'update' onPress = { refreshData } text = 'refresh'/>
          </View>
        </ScrollView>
      </>
      )}
}