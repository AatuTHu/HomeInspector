import React from "react"
import { View,ScrollView } from "react-native"
import { styles } from "../../styles/styles"
import DataCard from "../molecules/DataCard"
import Buttons from "../atoms/Buttons"
import InfoBox from "../atoms/InfoBox"
import Icon from "react-native-vector-icons/EvilIcons"

export default function HomeScreen({latestTemperature, latestHumidity, refreshData}) {


if(latestTemperature.length === 0 && latestHumidity.length === 0) {
return(
    <View style = { styles.controlContainer }>
      <InfoBox text = "No measurements found" type = "small" textStyle="subHeadingText"/>
      <Buttons type = "update" textStyle="white" onPress = { refreshData } text = "Refresh"/>
    </View>)
} else { 
return (
    <ScrollView>
      <View style = { styles.controlContainer }>
      <InfoBox text = "Latest Measurements" type = "heading" textStyle="subHeadingText"/>
        {latestTemperature.length !== 0  ? <>
        <DataCard 
          data = {latestTemperature.temperature} 
          location= {latestTemperature.location} 
          time={latestTemperature.time}
          date={latestTemperature.date}
          title = "Temperature"
          dataType = "temperature" 
          fillingColor= "#880D1E"
          unit = "°C"/>
        </> : <></>}
        
        {latestHumidity.length !== 0  ? <>           
        <DataCard 
          data = {latestHumidity.humidity} 
          location={latestHumidity.location} 
          time={latestHumidity.time}
          date={latestHumidity.date}
          title = "Humidity"
          dataType = "humidity"
          fillingColor = "#82DDF0"
          unit = "%"/>
          </> : <></>}
        
      <Buttons type = "update" textStyle="white" onPress = { refreshData } text = {<Icon name="refresh" size={40}/>}/>
      </View>
    </ScrollView>
  )}
}