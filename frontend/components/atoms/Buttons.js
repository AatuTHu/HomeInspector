import { Text, TouchableOpacity } from 'react-native'
import { buttons } from '../../styles/buttonStyles'
import React from 'react'

export default function Buttons({text,textStyle, type, onPress}) {
    
    const getButtonStyle = () => { 
     
      const styleMap = {
        start: buttons.startButton,
        save: buttons.saveButton,
        delete: buttons.deleteButton,
        nav: buttons.navButtons,
        update: buttons.updateButton,
        refresh: buttons.refreshButton,
        pin: buttons.pinButton
      };
    
      return styleMap[type] || buttons.defaultStyle;
    }

    const getTextStyle = () => {
      const textMap = {
        white : buttons.whiteButtonText,
        black : buttons.blackButtonText
      }

      return textMap[textStyle]
    }

    return (
      <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
        <Text style={getTextStyle()}>{text}</Text>
      </TouchableOpacity>
    )
  
}
