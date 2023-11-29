import { Text, View,TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import { buttons } from '../../styles/buttonStyles';

export default function BottomBar({setScreen}) {
  return (
    <View style = {styles.navContainer}>
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(3) } >
        <Text>
          Pinned
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(1) } >
        <Text>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(2) } >
        <Text>
          Control
        </Text>
      </TouchableOpacity>
    </View>
  )
}