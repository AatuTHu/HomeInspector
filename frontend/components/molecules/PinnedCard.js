import { View, TouchableOpacity,Text } from 'react-native'
import { useState } from 'react'
import { styles } from '../../styles/styles'
import { buttons } from '../../styles/buttonStyles'
import InputBox from '../atoms/InputBox'

export default function PinnedCard({data,location,time,title,date,unit,onPinPress,id,note, onAddNote}) {

  const [newNote, setNewNote] = useState("")


return (
  <>
      <View style = { styles.pinnedInfoBox}>

      <View style = {styles.pinTextContainer}>
          <Text style = { styles.metricTextTitle }>{title}</Text>
          <Text style = { styles.pinnedText }>{date} | {time} | {data} {unit}</Text>
          <Text style = { styles.pinnedText }>{location}</Text>
          <Text style = { styles.pinnedText }>{note}</Text>
          <InputBox placeholder= "add a note.." multiline = { true } newText = { setNewNote }/>
      </View>

        <View style = {styles.pinnedButtonBox}>
        <TouchableOpacity style = {buttons.unPinButton} onPress = { () => onPinPress(id, title)}>
          <Text style = {buttons.blackButtonText}>unpin</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {buttons.pinSaveButton} onPress = { () => onAddNote(id, title, newNote)}>
          <Text style = {buttons.blackButtonText}>add</Text>
        </TouchableOpacity>
        </View>        
      </View>
  </>
)}
