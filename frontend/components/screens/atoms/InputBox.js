import { View, TextInput } from 'react-native'
import { styles } from '../../../styles/styles'
import React from 'react'

export default function InputBox({placeholder, text, newText, onSubmitEditing}) {
  return (
    <View style = { styles.infoBoxes }> 
        <TextInput style = { styles.subHeading } placeholder = { placeholder } onChangeText={ (text) => newText(text)} onSubmitEditing={ onSubmitEditing }>{text}</TextInput>
    </View>
  )
}