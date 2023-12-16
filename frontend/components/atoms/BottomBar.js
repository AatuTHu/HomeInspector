import { Text, View,TouchableOpacity } from 'react-native';
import { lightStyles } from '../../styles/lightStyles';
import { buttons } from '../../styles/buttonStyles';
import  Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/AntDesign'

export default function BottomBar({setScreen, isDarkTheme}) {
  return (
    <View style = {lightStyles.navContainer}>
      <TouchableOpacity style = { isDarkTheme ? buttons.darkNavButtons : buttons.navButtons } onPress={ () => setScreen(3) } >
        <Text>
          <Icon2 name="pushpino" size={25} color={isDarkTheme ? "white" : "black"}/>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = { isDarkTheme ? buttons.darkNavButtons :buttons.navButtons } onPress={ () => setScreen(1) } >
        <Text>
          <Icon1 name="home" size={25} color={isDarkTheme ? "white" : "black"}/>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = { isDarkTheme ? buttons.darkNavButtons :buttons.navButtons } onPress={ () => setScreen(2) } >
        <Text>
          <Icon2 name="dashboard" size={25} color={isDarkTheme ? "white" : "black"}/>
        </Text>
      </TouchableOpacity>
    </View>
  )
}