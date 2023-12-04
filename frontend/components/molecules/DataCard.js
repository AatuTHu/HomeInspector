import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/styles'

export default function DataCard({data,location,time,title,fillingColor,date,unit,cardType}) {

    const maxValue = 70;

    const percentage = (data / maxValue) * 100;


return (
  <View style = { styles.mediumInfoBox}>
      <View style = {styles.dataContainer}>
          <Text style = { styles.subHeadingText }>{data} {unit}</Text>
          <View style = {[styles.mercury, { height: `${percentage}%`, backgroundColor: `${fillingColor}`}]}/>
      </View>

      <View style = {styles.textDataContainer}>
        <Text style = {styles.subHeadingText}>{title}</Text>
        <Text style = { styles.subHeadingText }>{date} - {time}</Text>
        <Text style = { styles.subHeadingText }>{location}</Text>  
      </View>
  </View>
)
}
