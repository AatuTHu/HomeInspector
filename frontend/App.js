import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,View } from 'react-native';
import { useState } from 'react'
import { styles } from './styles/styles';
import HomeScreen from './components/cells/HomeScreen';
import ControlScreen from './components/cells/ControlScreen'
import NotesScreen from './components/cells/NotesScreen';
import MetricsScreen from './components/cells/MetricsScreen';
import BottomBar from './components/atoms/BottomBar'
import TopBar from './components/atoms/TopBar';


export default function App() {

  const [screen, setScreen] = useState(1);

  const screens = () => {
    switch (screen) {
      case 1:
        return <HomeScreen/>    
      case 2:
        return <ControlScreen setScreen={ setScreen }/>
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
