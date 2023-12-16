import { View, TextInput } from 'react-native'
import { lightStyles} from '../../styles/lightStyles'
import React from 'react'
import { darkStyles } from '../../styles/darkStyles'

export default function InputBox({placeholder, text, newText, onSubmitEditing, multiline, isDarkTheme}) {
  return (
    <View style = { isDarkTheme? darkStyles.smallInfoBox : lightStyles.smallInfoBox }> 
        <TextInput style = { isDarkTheme ? darkStyles.subHeadingText : lightStyles.subHeadingText } multiline = {multiline} placeholder = { placeholder } placeholderTextColor={ isDarkTheme ? "white" : "black"} onChangeText={ (text) => newText(text)} onSubmitEditing={ onSubmitEditing }>{text}</TextInput>
    </View>
  )
}