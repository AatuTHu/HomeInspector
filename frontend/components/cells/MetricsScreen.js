import { useState} from 'react'
import DataCard from '../atoms/DataCard'
import variables from '../../env'
import { View, ScrollView, TouchableOpacity,Text } from 'react-native'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'


export default function MetricsScreen({temperature, humidity, setTemperature, setHumidity}) {

  const { humidityURL, temperatureURL, apiKey} = variables

  const onDeletePress = async(id, type) => {
   let url = type === 'humidity' ? humidityURL : temperatureURL
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `apiKey=${apiKey}&id=${id}`,
    }).catch((error) => { 
      console.error(error.message); 
    });

    if(response.status === 200) {
      let tempArray
      type === 'humidity' ?  tempArray = [...humidity] : tempArray = [...temperature]    
      let objectToBeDeleted = tempArray.findIndex(p => p.id === id);   
      tempArray.splice(objectToBeDeleted, 1)
      type === 'humidity' ? setHumidity(tempArray) : setTemperature(tempArray)
    }
  }

  const onPinPress = async(id, type) => {
    console.log(temperature[0])
    let pinned = true;
    let url = type === 'humidity' ? humidityURL : temperatureURL


    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `apiKey=${apiKey}&id=${id}&pinned=${pinned}`,
    }).catch((error) => { 
      console.error(error.message); 
    }); 

    if(response.status === 200) {
      type === 'humidity' ?  tempArray = [...humidity] : tempArray = [...temperature]    
      let tempArray
      let objectToBeUpdated = tempArray.findIndex(p => p.id === id);   
      tempArray[objectToBeUpdated].pinned = true;
      type === 'humidity' ? setHumidity(tempArray) : setTemperature(tempArray)

      console.log(temperature[0])
    }

  }

  return (
  <ScrollView>
    {temperature !== undefined ? <>
      { temperature.map ( (temp) => { return (
      <View key = {temp.id} style = { styles.controlContainer}>
       <DataCard 
        data = { temp.temperature } 
        location= {temp.location} 
        time= {temp.time}
        date= {temp.date}
        dataType = 'temperature' 
        fillingColor= 'lightblue'
        unit = '°C'/>

      <View style= {styles.buttonRowContainer}>
       { temp.pinned === true ? (<></>) : (<><TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(temp.id, "temperature")}>
        <Text style = {buttons.buttonText}>Pin reading</Text>
      </TouchableOpacity></>)}
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(temp.id, "temperature")}><Text style = {buttons.buttonText}>Delete</Text></TouchableOpacity>
      </View>
      
      </View>)})}
      </> : <></>}
            
    {humidity !== undefined ? <>
      { humidity.map ( (hum) => { return (
      <View key = {hum.id} style = { styles.controlContainer}>
        <DataCard 
          data = { hum.humidity } 
          location={hum.location} 
          time={hum.time}
          date={hum.date}
          dataType = 'humidity'
          fillingColor = 'darkblue'
          unit = '%'/>
          
      <View style= {styles.buttonRowContainer}>
      { hum.pinned === true ? (<></>) : (<><TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(hum.id, "humidity")}><Text style = {buttons.buttonText}>Pin reading</Text></TouchableOpacity></>)}
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(hum.id, "humidity")}><Text style = {buttons.buttonText}>Delete</Text></TouchableOpacity>
      </View>
          </View>)})}
      </> : <></>}
  </ScrollView>
  )
}