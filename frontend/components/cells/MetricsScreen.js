import variables from "../../env"
import { View, ScrollView } from "react-native"
import MetricsCard from "../molecules/MetricsCard"
import InfoBox from "../atoms/InfoBox"
import { lightStyles } from "../../styles/lightStyles"
import { darkStyles } from "../../styles/darkStyles"

export default function MetricsScreen({temperature, humidity, setTemperature, setHumidity, isDarkTheme}) {

  const { humidityURL,humidityPinnedURL,temperaturePinnedURL, temperatureURL, apiKey} = variables

  const onDeletePress = async(id, type) => {
   let url = type === "humidity" ? humidityURL : temperatureURL
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `apiKey=${apiKey}&id=${id}`,
    }).catch((error) => { 
      console.log(error.message); 
    });

    if(response.status === 200) {
      let tempArray
      type === "humidity" ?  tempArray = [...humidity] : tempArray = [...temperature]    
      let objectToBeDeleted = tempArray.findIndex(p => p.id === id);   
      tempArray.splice(objectToBeDeleted, 1)
      type === "humidity" ? setHumidity(tempArray) : setTemperature(tempArray)
    }
  }

  const onPinPress = async(id, type) => {
    let pinned = true;
    let url = type === "humidity" ? humidityPinnedURL : temperaturePinnedURL
    let data = { apiKey, id, pinned }

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch((error) => { 
      console.log(error.message); 
    }); 

    if(response.status === 200) {
      type === "humidity" ?  tempArray = [...humidity] : tempArray = [...temperature]    
      let tempArray
      let objectToBeUpdated = tempArray.findIndex(p => p.id === id);   
      tempArray[objectToBeUpdated].pinned = true;
      type === "humidity" ? setHumidity(tempArray) : setTemperature(tempArray)
    }

  }
  
if( temperature.length === 0 && humidity.length === 0) {
  return (<View style = { isDarkTheme ? darkStyles.displayBox : lightStyles.displayBox}>
    <InfoBox text = "No metric data found" type = "heading" textStyle="subHeadingText" isDarkTheme={isDarkTheme}/>
  </View>)
} else {

  return (
  <ScrollView>
    <View style = { isDarkTheme ? darkStyles.displayBox : lightStyles.displayBox}>
      {temperature.length !== 0 ? <>
        <InfoBox text = "Temperatures" textStyle="subHeadingText" type = "heading" isDarkTheme={isDarkTheme}/>
        {temperature.map( (temp) => {return <View key = {temp.id}>
        <MetricsCard 
        data={temp.temperature}
        location={temp.location}
        time={temp.time}
        date={temp.date}
        unit="°C"
        title="temperature"
        pinned={temp.pinned}
        id={temp.id}
        onPinPress={onPinPress} 
        onDeletePress={onDeletePress}
        isDarkTheme = {isDarkTheme}/> 
        </View>})}</>
     : <></>}

      {humidity.length !== 0 ? <>
        <InfoBox text = "Humidity" textStyle="subHeadingText" type = "heading"/>
        {humidity.map( (hum) => {return <View key = {hum.id}>
        <MetricsCard 
        data={hum.humidity}
        location={hum.location}
        time={hum.time}
        date={hum.date}
        unit="%"
        title="humidity"
        pinned={hum.pinned}
        id={hum.id}
        onPinPress={onPinPress} 
        onDeletePress={onDeletePress}
        isDarkTheme = {isDarkTheme}/>
        </View>})}</>
     : <></>} 
    </View>
  </ScrollView>
  )
}
}