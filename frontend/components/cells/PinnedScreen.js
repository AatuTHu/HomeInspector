import variables from '../../env'
import { useState } from 'react'
import { styles } from '../../styles/styles'
import { View, ScrollView,Text } from 'react-native'
import PinnedCard from '../molecules/PinnedCard'
import InfoBox from '../atoms/InfoBox'

export default function PinnedScreen({temperature, setTemperature, humidity, setHumidity}) {

  const { humidityURL, temperatureURL, apiKey} = variables
  
  let noPins = 0

  const onPinPress = async(id, type) => {

    let pinned = false;
    let url = type === 'humidity' ? humidityURL : temperatureURL
    let data = { apiKey, id, pinned }

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch((error) => { 
      console.error(error.message); 
    }); 

    if(response.status === 200) {
      type === 'humidity' ?  tempArray = [...humidity] : tempArray = [...temperature]    
      let tempArray
      let objectToBeUpdated = tempArray.findIndex(p => p.id === id);   
      tempArray[objectToBeUpdated].pinned = false;
      type === 'humidity' ? setHumidity(tempArray) : setTemperature(tempArray)
    }

  }

  const renderPinnedCards = (data) => {
    const pinnedItems = data.filter(item => item.pinned === true);

    if (pinnedItems.length === 0) {
      noPins = noPins+1
      return (<></>)
    }

    return pinnedItems.map((item) => (
      <View key={item.id}>
        <PinnedCard
          data={item.temperature || item.humidity}
          location={item.location}
          time={item.time}
          date={item.date}
          unit={item.temperature ? "°C" : "%"}
          title={item.temperature ? "temperature" : "humidity"}
          id={item.id}
          onPinPress={onPinPress}
        />
      </View>
    ));
  }


if( temperature.length === 0 || humidity.length === 0) {
  return (<View style = {styles.displayBox}>
    <InfoBox text = "No measurements found" type = "heading" textStyle="subHeadingText"/>
  </View>)
} else {
  return (
  <ScrollView>
     <View style = {styles.displayBox}>
      {renderPinnedCards(temperature)}
      {renderPinnedCards(humidity)}
    </View>
    {noPins === 2 ? (<><View style = {styles.displayBox}>
    <InfoBox text = "Nothing pinned yet" type = "heading" textStyle="subHeadingText"/>
    </View></>) : (<></>)}
  </ScrollView>
  )
}}