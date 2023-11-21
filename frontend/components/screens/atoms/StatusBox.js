import { View, Text } from 'react-native'
import { styles } from '../../../styles/styles'
import React from 'react'

export default function StatusBox({text}) {
  return (
    <View style = { styles.statusBox }>
        <Text style = { styles.subHeading }>{text}</Text>
    </View>
  )
}