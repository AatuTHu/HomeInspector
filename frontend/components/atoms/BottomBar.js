import { Text, View,TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import { buttons } from '../../styles/buttonStyles';
import  Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/AntDesign'

export default function BottomBar({setScreen}) {
  return (
    <View style = {styles.navContainer}>
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(3) } >
        <Text>
          <Icon2 name="pushpino" size={25}/>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(1) } >
        <Text>
          <Icon1 name="home" size={25}/>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = { buttons.navButtons } onPress={ () => setScreen(2) } >
        <Text>
          <Icon2 name="dashboard" size={25}/>
        </Text>
      </TouchableOpacity>
    </View>
  )
}