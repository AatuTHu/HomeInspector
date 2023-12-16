import variables from "../../env"
import { lightStyles } from "../../styles/lightStyles"
import { View, ScrollView } from "react-native"
import PinnedCard from "../molecules/PinnedCard"
import InfoBox from "../atoms/InfoBox"
import { darkStyles } from "../../styles/darkStyles"

export default function PinnedScreen({temperature, setTemperature, humidity, setHumidity, isDarkTheme}) {

  const { humidityPinnedURL, temperaturePinnedURL,humidityNoteURL,temperatureNoteURL, apiKey} = variables
  
 
  const onPinPress = async(id, type) => {
    let pinned = false;
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
      tempArray[objectToBeUpdated].pinned = false;
      type === "humidity" ? setHumidity(tempArray) : setTemperature(tempArray)
    }

  }

  const onAddNote = async(id, type, note) => {
    let url = type === "humidity" ? humidityNoteURL : temperatureNoteURL
    let data = { apiKey, id, note}

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch((error) => { 
      console.log(error.message); 
    })

    return response.status
  }

  

if( temperature.length === 0 || humidity.length === 0) {
  return (<View style = { isDarkTheme? darkStyles.displayBox : lightStyles.displayBox}>
    <InfoBox text = "No measurements found" type = "heading" textStyle="subHeadingText" isDarkTheme={isDarkTheme}/>
  </View>)
} else {

  const pinnedTempItems = temperature.filter(temp => temp.pinned);
  const pinnedHumItems = humidity.filter(hum => hum.pinned);
  return (
  <ScrollView>
     <View style = { isDarkTheme? darkStyles.displayBox : lightStyles.displayBox}>
     {pinnedTempItems.length > 0 ? (
      pinnedTempItems.map(temp => (
        <View key={temp.id}>
          <PinnedCard
            data={temp.temperature}
            location={temp.location}
            time={temp.time}
            date={temp.date}
            id={temp.id}
            note={temp.note}
            unit={"°C"}
            title={"temperature"}
            onPinPress={onPinPress}
            onAddNote={onAddNote}
            isDarkTheme={isDarkTheme}
          />
        </View>
      ))
    ) : (
      <View style = {isDarkTheme? darkStyles.displayBox : lightStyles.displayBox}>
      <InfoBox text = "No temperatures pinned" type = "heading" textStyle="subHeadingText"/>
  </View>
    )}

  {pinnedHumItems.length > 0 ? (
      pinnedHumItems.map(hum => (
        <View key={hum.id}>
          <PinnedCard
            data={hum.humidity}
            location={hum.location}
            time={hum.time}
            date={hum.date}
            id={hum.id}
            note={hum.note}
            unit={"%"}
            title={"humidity"}
            onPinPress={onPinPress}
            onAddNote={onAddNote}
            isDarkTheme={isDarkTheme}
          />
        </View>
      ))
    ) : (
      <View style = {lightStyles.displayBox}>
      <InfoBox text = "No humidities pinned" type = "heading" textStyle="subHeadingText" isDarkTheme={isDarkTheme}/>
    </View>
    )}
    </View>
  </ScrollView>
  )
}}