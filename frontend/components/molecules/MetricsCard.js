import { View, TouchableOpacity,Text } from 'react-native'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'
import InfoBox from '../atoms/InfoBox'
import { useState} from 'react'
import DataCard from '../atoms/DataCard'

export default function MetricsCard({temperature, humidity, onDeletePress, onPinPress}) {
  return (
   <>
    <InfoBox text = 'Temperatures' textStyle="subHeadingText" type = 'heading'/>
    {temperature !== undefined ? <>
      { temperature.map ( (temp) => { return (
      <View key = {temp.id} style = { styles.controlRowContainer}>
       <DataCard 
        data = { temp.temperature } 
        location= {temp.location} 
        time= {temp.time}
        date= {temp.date}
        title = "Temperature"
        dataType = 'temperature' 
        fillingColor= 'lightblue'
        boxType="metrics"
        unit = '°C'/>

      <View style= {styles.buttonColumnContainer}>
       { temp.pinned === false ? (<></>) : (<>
       <TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(temp.id, "temperature")}>
        <Text style = {buttons.blackButtonText}>Pin</Text>
      </TouchableOpacity></>)}

        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(temp.id, "temperature")}>
          <Text style = {buttons.blackButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
      </View>)})}
      </> : <></>}

      {humidity !== undefined ? <>
        <InfoBox text = 'Humidities' textStyle="subHeadingText" type = 'heading'/>
      { humidity.map ( (hum) => { return (
      <View key = {hum.id} style = { styles.controlRowContainer}>
        <DataCard 
          data = { hum.humidity } 
          location={hum.location} 
          time={hum.time}
          date={hum.date}
          title='Humidity'
          dataType = 'humidity'
          fillingColor = 'darkblue'
          boxType="metrics"
          unit = '%'/>

      <View style= {styles.buttonColumnContainer}>
      { hum.pinned === false ? (<></>) : (<>
      <TouchableOpacity style = {buttons.pinButton}  onPress = { () => onPinPress(hum.id, "humidity")}>
        <Text style = {buttons.blackButtonText}>Pin</Text>
      </TouchableOpacity></>)}
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(hum.id, "humidity")}>
          <Text style = {buttons.blackButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
          </View>)})}
      </> : <></>}
            
   </>
  )
}