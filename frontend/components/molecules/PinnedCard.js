import { View, TouchableOpacity,Text } from 'react-native'
import { useState } from 'react'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'
import InputBox from '../atoms/InputBox'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PinnedCard({data,location,time,title,date,unit,onPinPress,id,note,onAddNote}) {

  const [newNote, setNewNote] = useState("")
  const [statusText, setStatusText] = useState("")

  const onSumbitNote = async() => {
    const status = await onAddNote(id, title, newNote)

    if(status === 200) {
      setStatusText("note added");
      const timeout = setTimeout(() => {
      setStatusText("");
    }, 3000);
   return () => clearTimeout(timeout);
    } else {
      setStatusText("something went wrong");
      const timeout = setTimeout(() => {
      setStatusText("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }
  
return (
  <>
      <View style = { styles.pinnedInfoBox}>

      <View style = {styles.pinTextContainer}>
          <Text style = { styles.metricTextTitle }>{title}</Text>
          <Text style = { styles.pinnedText }>{date} | {time} | {data} {unit}</Text>
          <Text style = { styles.pinnedText }>{location}</Text>
          <Text style = { styles.pinnedText }>Note: {note}</Text>
          <InputBox placeholder= "add a note.." multiline = { true } newText = { setNewNote }/>

          <Text style = { styles.pinnedText }>{statusText}</Text>
      </View>

        <View style = {styles.pinnedButtonBox}>
        <TouchableOpacity style = {buttons.unPinButton} onPress = { () => onPinPress(id, title)}>
          <Text style = {buttons.blackButtonText}><Icon2 name='pin-off-outline' size={30}/></Text>
        </TouchableOpacity>

        <TouchableOpacity style = {buttons.pinSaveButton} onPress = { () => onSumbitNote()}>
          <Text style = {buttons.blackButtonText}><Icon1 name="add" size={30}/></Text>
        </TouchableOpacity>
        </View>        
      </View>
  </>
)}
