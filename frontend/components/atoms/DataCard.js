import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../styles/styles'

export default function DataCard({data,location,time, dataType, fillingColor, unit}) {

    const maxValue = 55;

    const percentage = (data / maxValue) * 100;

    const dataContainerType = () => {

       const styleMap = {
         temperature : styles.dataTemperatureContainer,
         humidity : styles.dataHumidityContainer
       }

       return styleMap[dataType]
    }

  return (
    <View style = { styles.mediumInfoBox}>
        <View style = {dataContainerType()}>
            <Text style = { styles.subHeadingText }>{data} {unit}</Text>
            <View style = {[styles.mercury, { height: `${percentage}%`, backgroundColor: `${fillingColor}`}]}/>
        </View>

        <View style = {styles.textDataContainer}>
            <Text style = { styles.headingText }>{location}</Text>
            <Text style = { styles.headingText }>{time}</Text>
        </View>
    </View>
  )
}