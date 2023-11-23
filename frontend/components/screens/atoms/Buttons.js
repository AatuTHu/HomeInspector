import { Text, TouchableOpacity } from 'react-native'
import { buttons } from '../../../styles/buttonStyles'
import React from 'react'

export default function Buttons({text, type, onPress}) {
    
    const getButtonStyle = () => { 
     
      const styleMap = {
        start: buttons.startButton,
        save: buttons.saveButton,
        delete: buttons.deleteButton,
        nav: buttons.navButtons,
        update: buttons.updateButton,
        nav: buttons.navButtons,
        refresh: buttons.refreshButton
      };
    
      return styleMap[type] || buttons.defaultStyle;
    }

    return (
      <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
        <Text style={buttons.buttonText}>{text}</Text>
      </TouchableOpacity>
    )

    
}
