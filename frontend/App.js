import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState } from 'react'
import { styles } from './styles/styles';
import MainScreen from './components/screens/MainScreen';
import BottomBar from './components/BottomBar'
import ProfileScreen from './components/screens/profileScreen/ProfileScreen';
import NotesScreen from './components/screens/NotesScreen';
import TopBar from './components/TopBar';

export default function App() {

  const [screen, setScreen] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const screens = () => {
    switch (screen) {
      case 1:
        return <MainScreen/>;      
      case 2:
        return <ProfileScreen isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
      case 3:
        return <NotesScreen/>;
      default:
      break;
      }
  }


  return (
    <View style={styles.container}>
      <View style = {styles.topBar}>
        <TopBar/>
      </View>
      <View style={styles.displayBox}>
        {screens()}
      </View>
      <View style={styles.navBar}>
        <BottomBar setScreen = { setScreen }/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
