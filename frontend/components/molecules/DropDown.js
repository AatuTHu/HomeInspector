import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../styles/styles'
import Buttons from '../atoms/Buttons'
import InfoBox from '../atoms/InfoBox'

export default function DropDown({setSelected,selected, location}) {

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
  <Buttons text = 'Select Sensor..' onPress = { onPressDropDown }></Buttons>
    <View style = { styles.displayBox}>    
      { hide ? (<>
            <View>
                <Text style = { styles.selectedText }>{selected}</Text>
            </View>
        </>) : (<>
            <View style = {styles.dropDownBox}>
                <TouchableOpacity style = {styles.dropDownText} onPress = { () => onSelect('humidity')}>
                    <Text style = {styles.dropDownText}>Humidity sensor</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.dropDownText} onPress = { () => onSelect('temperature')}>
                    <Text style = {styles.dropDownText}>Temperature sensor</Text>
                </TouchableOpacity>
            </View>
        </>)}
    </View>
    
    </>)
}