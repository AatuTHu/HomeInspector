import { View, TextInput } from 'react-native'
import { styles } from '../../styles/styles'
import React from 'react'

export default function InputBox({placeholder, text, newText, onSubmitEditing, multiline}) {
  return (
    <View style = { styles.smallInfoBox }> 
        <TextInput style = { styles.subHeadingText } multiline = {multiline} placeholder = { placeholder } onChangeText={ (text) => newText(text)} onSubmitEditing={ onSubmitEditing }>{text}</TextInput>
    </View>
  )
}