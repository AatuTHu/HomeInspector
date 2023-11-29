import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../styles/styles'
import Buttons from '../atoms/Buttons'
import InfoBox from '../atoms/InfoBox'

export default function DropDown({setSelected,selected,options}) {

    const [hide, setHide] = useState(true)

    const onPressDropDown = () => {
        setHide(!hide)
    }

    const onSelect = (value) => {
        setSelected(value)
        setHide(!hide)
    }

  return (<>
  <InfoBox text = "Sensor" textStyle = 'headingText' type = 'heading'/>
  <Buttons text = 'Select a sensor..' textStyle = 'black' onPress = { onPressDropDown }></Buttons>
    <View style = { styles.displayBox}>    
    { hide ? (<>
    <View>
        <Text style = { styles.selectedText }>{selected}</Text>
    </View>
      </>) : (<>
          <View style = {styles.dropDownBox}>
              {options.map((options) => {
                  return(<View key = {options.id}>
                    <TouchableOpacity  style = {styles.dropDownTextContainer} onPress = { () => onSelect(options.value)}>
                      <Text style = {styles.subHeadingText}>{options.name}</Text>
                    </TouchableOpacity>
                  </View>)
              })}
          </View>
      </>)}
    </View>
    
    </>)
}