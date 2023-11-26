import React from 'react'
import DataCard from '../atoms/DataCard'
import Buttons from '../atoms/Buttons'
import variables from '../../env'
import { View, ScrollView, TouchableOpacity,Text } from 'react-native'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'


export default function MetricsScreen({temperature, humidity}) {

  const { humidityURL, temperatureURL, apiKey} = variables

  const onDeletePress = async(id, type) => {
   let url = type === 'humidity' ? humidityURL : temperatureURL
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `apiKey=${apiKey}&id=${id}`,
    })
  }

  const onPinPress = async(item, type) => {
   let url = type === 'humidity' ? humidityURL : temperatureURL
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `apiKey=${apiKey}&item=${item}`,
    })
  }

  return (
  <ScrollView>
    {temperature !== undefined ? <>
      { temperature.map ( (temperature) => { return (
      <View key = {temperature.id} style = { styles.controlContainer}>
       <DataCard 
        data = { temperature.temperature } 
        location= {temperature.location} 
        time= {''}
        dataType = 'temperature' 
        fillingColor= 'lightblue'
        unit = '°C'/>

      <View style= {styles.buttonRowContainer}>
        <TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(temperature, "temperature")}><Text style = {buttons.buttonText}>Pin reading</Text></TouchableOpacity>
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(temperature.id, "temperature")}><Text style = {buttons.buttonText}>Delete</Text></TouchableOpacity>
      </View>
      
      </View>)})}
      </> : <></>}
            
    {humidity !== undefined ? <>
      { humidity.map ( (humidity) => { return (
      <View key = {humidity.id} style = { styles.controlContainer}>
        <DataCard 
          data = { humidity.humidity } 
          location={humidity.location} 
          time={''}
          dataType = 'humidity'
          fillingColor = 'darkblue'
          unit = '%'/>
          
      <View style= {styles.buttonRowContainer}>
      <TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(humidity, "humidity")}><Text style = {buttons.buttonText}>Pin reading</Text></TouchableOpacity>
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(humidity.id, "humidity")}><Text style = {buttons.buttonText}>Delete</Text></TouchableOpacity>
      </View>
          </View>)})}
      </> : <></>}
  </ScrollView>
  )
}