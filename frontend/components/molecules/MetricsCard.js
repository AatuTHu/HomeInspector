import { View, TouchableOpacity,Text } from 'react-native'
import { lightStyles } from '../../styles/lightStyles'
import { buttons } from '../../styles/buttonStyles'
import Icon1 from 'react-native-vector-icons/Octicons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { darkStyles } from '../../styles/darkStyles'

export default function MetricsCard({data,location,time,title,date,unit,pinned,onDeletePress,onPinPress,id,isDarkTheme}) {
  return (
   <>
    <View style = {lightStyles.controlRowContainer}>
      <View style = { isDarkTheme ? darkStyles.metricInfoBox : lightStyles.metricInfoBox}>
          <Text style = { isDarkTheme ? darkStyles.metricTextTitle : lightStyles.metricTextTitle }>{title}</Text>
          <Text style = { isDarkTheme ? darkStyles.metricText : lightStyles.metricText }>{date} - {time}</Text>
          <Text style = { isDarkTheme ? darkStyles.metricText : lightStyles.metricText }>{data} {unit}</Text>
          <Text style = { isDarkTheme ? darkStyles.metricText : lightStyles.metricText }>{location}</Text>  
      </View>

      <View style= {lightStyles.buttonColumnContainer}>
       { pinned === true ? (<></>) : (<>
       <TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(id, title)}>
        <Text style = {buttons.blackButtonText}><Icon1 name='pin' size={30}/></Text>
      </TouchableOpacity></>)}
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(id, title)}>
          <Text style = {buttons.blackButtonText}><Icon2 name='delete' size={30}/></Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
)}