import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState } from 'react'
import { styles } from './styles/styles';
import NavBar from './components/NavBar';
import MainScreen from './components/screens/MainScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import NotesScreen from './components/screens/NotesScreen';
import TopBar from './components/TopBar';

export default function App() {

  const [screen, setScreen] = useState(1);


  const screens = () => {
    switch (screen) {
      case 1:
        return <MainScreen/>;      
      case 2:
        return <ProfileScreen/>;
      case 3:
        return <NotesScreen/>;
      default:
      break;
      }
  }


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TopBar/>
      </View>
      <View style={styles.displayBox}>
        {screens()}
      </View>
      <View style={styles.navBar}>
        <NavBar setScreen = { setScreen }/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
