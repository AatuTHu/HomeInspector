import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,View } from 'react-native';
import { useState } from 'react'
import { styles } from './styles/styles';
import HomeScreen from './components/screens/HomeScreen';
import ControlScreen from './components/screens/ControlScreen'
import BottomBar from './components/BottomBar'
import NotesScreen from './components/screens/NotesScreen';
import TopBar from './components/TopBar';
import MetricsScreen from './components/screens/MetricsScreen';


export default function App() {

  const [screen, setScreen] = useState(1);
  const [ssid, setSsid] = useState("");

  const screens = () => {
    switch (screen) {
      case 1:
        return <HomeScreen/>    
      case 2:
        return <ControlScreen ssid = { ssid } setScreen={ setScreen }/>
      case 3:
        return <NotesScreen/>
      case 4:
        return <MetricsScreen setScreen={ setScreen }/>
      default:
      break;
      }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.topBar}>
        <TopBar/>
      </View>
        <View style = {styles.displayBox}>
          {screens()}
        </View> 
      <View style={styles.navBar}>
        <BottomBar setScreen = { setScreen }/>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
