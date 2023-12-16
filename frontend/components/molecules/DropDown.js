import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { lightStyles } from '../../styles/lightStyles'
import Buttons from '../atoms/Buttons'
import InfoBox from '../atoms/InfoBox'
import { darkStyles } from '../../styles/darkStyles'

export default function DropDown({setSelected,selected,options, isDarkTheme}) {

  const [hide, setHide] = useState(true)

    const onPressDropDown = () => {
        setHide(!hide)
    }

    const onSelect = (value) => {
        setSelected(value)
        setHide(!hide)
    }

  return (<>
  <InfoBox text = "Sensor" textStyle = 'headingText' type = 'heading' isDarkTheme={isDarkTheme}/>
  <Buttons text = 'Select a sensor..' textStyle = {isDarkTheme ? "white" : "black"} onPress = { onPressDropDown }></Buttons>
    <View style = { isDarkTheme ? darkStyles.displayBox : lightStyles.displayBox}>    
    { hide ? (<>
    <View>
        <Text style = { isDarkTheme ? darkStyles.selectedText : lightStyles.selectedText }>{selected}</Text>
    </View>
      </>) : (<>
          <View style = { isDarkTheme ? darkStyles.dropDownBox : lightStyles.dropDownBox}>
              {options.map((options) => {
                  return(<View key = {options.id}>
                    <TouchableOpacity  style = { isDarkTheme ? darkStyles.dropDownTextContainer : lightStyles.dropDownTextContainer} onPress = { () => onSelect(options.value)}>
                      <Text style = { isDarkTheme? darkStyles.subHeadingText : lightStyles.subHeadingText}>{options.name}</Text>
                    </TouchableOpacity>
                  </View>)
              })}
          </View>
      </>)}
    </View>
    
    </>)
}