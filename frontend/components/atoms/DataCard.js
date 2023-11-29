import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/styles'

export default function DataCard({data,location,time,title,fillingColor,date,unit,cardType, id}) {

    const maxValue = 70;

    const percentage = (data / maxValue) * 100;

  if(cardType === 'small') {
    return (
      <View style = { styles.metricInfoBox}>
          <Text style = { styles.metricTextTitle }>{title}</Text>
          <Text style = { styles.metricText }>{date} - {time}</Text>
          <Text style = { styles.metricText }>{data} {unit}</Text>
          <Text style = { styles.metricText }>{location}</Text>  
      </View>
   )

  } else if(cardType === 'big') {
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
}