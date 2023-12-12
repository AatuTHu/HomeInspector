import { View, TouchableOpacity,Text } from 'react-native'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'
import Icon1 from 'react-native-vector-icons/Octicons'
import Icon2 from 'react-native-vector-icons/AntDesign'

export default function MetricsCard({data,location,time,title,date,unit,pinned,onDeletePress,onPinPress,id}) {
  return (
   <>
    <View style = { styles.controlRowContainer}>
      <View style = { styles.metricInfoBox}>
          <Text style = { styles.metricTextTitle }>{title}</Text>
          <Text style = { styles.metricText }>{date} - {time}</Text>
          <Text style = { styles.metricText }>{data} {unit}</Text>
          <Text style = { styles.metricText }>{location}</Text>  
      </View>

      <View style= {styles.buttonColumnContainer}>
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