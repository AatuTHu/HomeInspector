import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,View } from 'react-native';
import { useState, useEffect } from 'react'
import { styles } from './styles/styles';
import variables from './env'
import HomeScreen from './components/cells/HomeScreen';
import ControlScreen from './components/cells/ControlScreen'
import PinnedScreen from './components/cells/PinnedScreen';
import MetricsScreen from './components/cells/MetricsScreen';
import BottomBar from './components/atoms/BottomBar'
import TopBar from './components/atoms/TopBar';


export default function App() {

  const { humidityURL, temperatureURL } = variables
  const [temperature, setTemperature] = useState([])
  const [humidity, setHumidity] = useState([])
  const [screen, setScreen] = useState(1)

  useEffect(() => {
    async function fetchData () {
        const result = await fetch(humidityURL).then((res)=>
        res.json()
      )
      setHumidity(result)
    }
   fetchData()
  }, [])

  useEffect(() =>{
    async function fetchData() {
      const result = await fetch(temperatureURL).then((res)=>
      res.json()
    )
      setTemperature(result)
    }
   fetchData()
  }, [])

  const screens = () => {
    switch (screen) {
      case 1:
        return <HomeScreen temperature={temperature} humidity={humidity}/>    
      case 2:
        return <ControlScreen setScreen={ setScreen }/>
      case 3:
        return <PinnedScreen/>
      case 4:
        return <MetricsScreen setScreen={ setScreen } temperature={temperature} humidity={humidity}/>
      default:
        return <HomeScreen temperature={temperature} humidity={humidity}/>
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
