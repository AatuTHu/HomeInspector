import { View, TouchableOpacity,Text } from 'react-native'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'
import DataCard from '../atoms/DataCard'

export default function MetricsCard({data,location,time,title,date,unit,pinned,onDeletePress,onPinPress,id}) {
  return (
   <>
    <View style = { styles.controlRowContainer}>
      <DataCard
        data={data}
        location={location}
        time={time}
        date={date}
        unit={unit}
        title={title}
        pinned={pinned}
        id={id}
        cardType='small'
      />

      <View style= {styles.buttonColumnContainer}>
       { pinned === true ? (<></>) : (<>
       <TouchableOpacity style = {buttons.pinButton} onPress = { () => onPinPress(id, title)}>
        <Text style = {buttons.blackButtonText}>Pin</Text>
      </TouchableOpacity></>)}
        <TouchableOpacity style = {buttons.deleteButton} onPress = { () => onDeletePress(id, title)}>
          <Text style = {buttons.blackButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
)}