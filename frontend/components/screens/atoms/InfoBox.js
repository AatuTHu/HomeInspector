import { View, Text } from 'react-native'
import { styles } from '../../../styles/styles'
import React from 'react'

export default function InfoBox({text}) {
  return (
    <View style = { styles.infoBoxes }>
        <Text style = { styles.subHeading }>{ text != "" ? (<Text>{text}</Text>) : (<></>) }</Text>
    </View>
  )
}   
