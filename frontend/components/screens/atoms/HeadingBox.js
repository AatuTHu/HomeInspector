import { View, Text } from 'react-native'
import { styles } from '../../../styles/styles'
import React from 'react'

export default function HeadingBox({text}) {
  return (
    <View style = { styles.headingBoxes }>
        <Text style = {styles.headingText}>{text}</Text>
    </View>
  )
}