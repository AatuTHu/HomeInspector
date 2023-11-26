import { View, Text } from 'react-native'
import { styles } from '../../styles/styles'
import React from 'react'

export default function InfoBox({text, type, textStyle}) {

  const getBoxStyles = () => { 
     
    const styleMap = {
      small: styles.smallInfoBox,
      medium: styles.mediumInfoBox,
      heading: styles.headingBox,
      status: styles.statusBox,
    };
  
    return styleMap[type];
  }

  const getTextStyle = () => {
    const styleMap = {
      subHeadingText: styles.subHeadingText,
      headingText: styles.headingText
    }

    return [styleMap[textStyle]]
  }

  return (
    <View style = {getBoxStyles()}>
        <Text style = {getTextStyle()}>{text}</Text>
    </View>
  )
}   
