import {useState} from 'react'
import { Text, View,TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function NavBar({setScreen}) {
  return (
    <View style = {styles.navContainer}>
      <TouchableOpacity style = { styles.navButtons } onPress={ () => setScreen(3) } >
        <View>
          <Text>
            Notes
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style = { styles.navButtons } onPress={ () => setScreen(1) } >
        <View>
          <Text>
            Home
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style = { styles.navButtons } onPress={ () => setScreen(2) } >
        <View>
          <Text>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
