import { View, Text } from 'react-native'
import React from 'react'
import { lightStyles } from '../../styles/lightStyles'
import { darkStyles } from '../../styles/darkStyles';

export default function DataCard({data,location,time,title,fillingColor,date,unit,isDarkTheme}) {

    const maxValue = 70;
    const percentage = (data / maxValue) * 100;

return (
  <View style = { isDarkTheme ? darkStyles.mediumInfoBox : lightStyles.mediumInfoBox}>
      <View style = { isDarkTheme ? darkStyles.dataContainer : lightStyles.dataContainer}>
          <Text style = { isDarkTheme? darkStyles.subHeadingText : lightStyles.subHeadingText }>{data} {unit}</Text>
          <View style = {[lightStyles.mercury, { height: `${percentage}%`, backgroundColor: `${fillingColor}`}]}/>
      </View>

      <View style = {lightStyles.textDataContainer}>
        <Text style = { isDarkTheme ? darkStyles.subHeadingText : lightStyles.subHeadingText}>{title}</Text>
        <Text style = { isDarkTheme ? darkStyles.subHeadingText : lightStyles.subHeadingText }>{date} - {time}</Text>
        <Text style = { isDarkTheme ? darkStyles.subHeadingText : lightStyles.subHeadingText }>{location}</Text>  
      </View>
  </View>
)
}
