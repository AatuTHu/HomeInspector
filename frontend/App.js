import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useState } from 'react'
import { styles } from './styles/styles';
import MainScreen from './components/screens/MainScreen';
import Control from './components/screens/Control'
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
        return <MainScreen/>    
      case 2:
        return <Control ssid = { ssid } setScreen={ setScreen }/>
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
