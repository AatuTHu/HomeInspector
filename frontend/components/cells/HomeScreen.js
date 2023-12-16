import React from "react"
import { View,ScrollView } from "react-native"
import { lightStyles } from "../../styles/lightStyles"
import DataCard from "../molecules/DataCard"
import Buttons from "../atoms/Buttons"
import InfoBox from "../atoms/InfoBox"
import Icon from "react-native-vector-icons/EvilIcons"

export default function HomeScreen({latestTemperature, latestHumidity, refreshData, isDarkTheme}) {


if(latestTemperature.length === 0 && latestHumidity.length === 0) {
return(
    <View style = { lightStyles.controlContainer }>
      <InfoBox text = "No measurements found" type = "small" textStyle="subHeadingText" isDarkTheme={isDarkTheme}/>
      <Buttons type = "refresh" textStyle="white" onPress = { refreshData } text = {<Icon name="refresh" size={40}/>}/>
    </View>)
} else { 
return (
    <ScrollView>
      <View style = { lightStyles.controlContainer }>
      <InfoBox text = "Latest Measurements" type = "heading" textStyle="subHeadingText" isDarkTheme={isDarkTheme}/>
        {latestTemperature.length !== 0  ? <>
        <DataCard 
          data = {latestTemperature.temperature} 
          location= {latestTemperature.location} 
          time={latestTemperature.time}
          date={latestTemperature.date}
          title = "Temperature"
          dataType = "temperature" 
          fillingColor= "#880D1E"
          unit = "°C"
          isDarkTheme={isDarkTheme}/>
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
          unit = "%"
          isDarkTheme={isDarkTheme}/>
          </> : <></>}
        
      <Buttons type = "refresh" textStyle="white" onPress = { refreshData } text = {<Icon name="refresh" size={40}/>}/>
      </View>
    </ScrollView>
  )}
}