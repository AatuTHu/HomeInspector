import { View, Text } from 'react-native'
import { lightStyles } from '../../styles/lightStyles'
import React from 'react'
import { darkStyles } from '../../styles/darkStyles';

export default function InfoBox({text, type, textStyle, isDarkTheme}) {

  const getBoxStyles = () => { 
     
    const styleMap = {
      small: lightStyles.smallInfoBox,
      medium: lightStyles.mediumInfoBox,
      heading: lightStyles.headingBox,
      status: lightStyles.statusBox,
    };
  
    return styleMap[type];
  }

  const getTextStyle = () => {
    const styleMap = {
      subHeadingText: isDarkTheme? darkStyles.subHeadingText : lightStyles.subHeadingText,
      headingText: isDarkTheme? darkStyles.headingText : lightStyles.headingText
    }

    return [styleMap[textStyle]]
  }

  return (
    <View style = {getBoxStyles()}>
        <Text style = {getTextStyle()}>{text}</Text>
    </View>
  )
}   
