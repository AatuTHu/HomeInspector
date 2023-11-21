import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { buttons } from '../../../styles/buttonStyles'
import React from 'react'

export default function Buttons({text, type, onPress}) {
    
    const findStyle = () => { 
        switch (type) {
            case 'start':
            return buttons.startButton
            
            case 'save':
            return buttons.saveButton
                
            case 'delete':
            return buttons.deleteButton
            
            case 'nav':
            return buttons.navButtons
        
            case 'update':
            return buttons.updateButton
        
        }
    }

    return (
      <TouchableOpacity style={findStyle()} onPress={onPress}>
        <Text style={buttons.buttonText}>{text}</Text>
      </TouchableOpacity>
    )

    
}
