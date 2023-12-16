import { View, TouchableOpacity,Text } from 'react-native'
import { useState } from 'react'
import { lightStyles } from '../../styles/lightStyles'
import { buttons } from '../../styles/buttonStyles'
import InputBox from '../atoms/InputBox'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { darkStyles } from '../../styles/darkStyles'

export default function PinnedCard({data,location,time,title,date,unit,onPinPress,id,note,onAddNote, isDarkTheme}) {

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
      <View style = { isDarkTheme ? darkStyles.pinnedInfoBox : lightStyles.pinnedInfoBox}>

      <View style = {lightStyles.pinTextContainer}>
          <Text style = { isDarkTheme ? darkStyles.metricTextTitle : lightStyles.metricTextTitle }>{title}</Text>
          <Text style = { isDarkTheme ? darkStyles.pinnedText : lightStyles.pinnedText }>{date} | {time} | {data} {unit}</Text>
          <Text style = { isDarkTheme ? darkStyles.pinnedText : lightStyles.pinnedText }>{location}</Text>
          <Text style = { isDarkTheme ? darkStyles.pinnedText : lightStyles.pinnedText }>Note: {note}</Text>
          <InputBox placeholder= "add a note.." multiline = { true } newText = { setNewNote } isDarkTheme={isDarkTheme}/>

          <Text style = { isDarkTheme ? darkStyles.pinnedText : lightStyles.pinnedText }>{statusText}</Text>
      </View>

        <View style = { isDarkTheme ? darkStyles.pinnedButtonBox:lightStyles.pinnedButtonBox}>
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
