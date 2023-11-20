import { Text, View,TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { buttons } from '../styles/buttonStyles';

export default function BottomBar({setScreen}) {
  return (
    <View style = {styles.navContainer}>
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(3) } >
        <View>
          <Text>
            Notes
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(1) } >
        <View>
          <Text>
            Home
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(2) } >
        <View>
          <Text>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}