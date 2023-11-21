import { View, TextInput } from 'react-native'
import { styles } from '../../../styles/styles'
import React from 'react'

export default function InputBox({placeholder, location }) {
  return (
    <View style = { styles.infoBoxes }> 
        <TextInput style = { styles.subHeading } placeholder = { placeholder } >{location}</TextInput>
    </View>
  )
}