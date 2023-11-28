import variables from '../../env'
import { View, ScrollView, TouchableOpacity,Text } from 'react-native'
import MetricsCard from '../molecules/MetricsCard'
import { styles } from '../../styles/styles'



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
    }

  }

  return (
  <ScrollView>
    <View style = {styles.displayBox}>
      <MetricsCard temperature={temperature} humidity={humidity} onPinPress={onPinPress} onDeletePress={onDeletePress}/> 
    </View>
  </ScrollView>
  )
}