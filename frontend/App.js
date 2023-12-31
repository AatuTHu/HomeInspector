import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,View } from 'react-native';
import { useState, useEffect } from 'react'
import { lightStyles } from './styles/lightStyles';
import { darkStyles } from './styles/darkStyles';
import variables from './env'
import HomeScreen from './components/cells/HomeScreen';
import ControlScreen from './components/cells/ControlScreen'
import PinnedScreen from './components/cells/PinnedScreen';
import MetricsScreen from './components/cells/MetricsScreen';
import BottomBar from './components/atoms/BottomBar'
import TopBar from './components/atoms/TopBar';


export default function App() {

  const { humidityURL, temperatureURL } = variables

  const [screen, setScreen] = useState(1)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  
  const [temperature, setTemperature] = useState([])
  const [latestTemperature, setLatestTemperature] = useState([]) 
  const [currentTempLoc, setCurrentTempLoc] = useState('')
  const [humidity, setHumidity] = useState([])
  const [latestHumidity, setLatestHumidity] = useState([])
  const [currentHumLoc, setCurrentHumLoc] = useState('')


  const fetchHumidityData = async() => {
    const result = await fetch(humidityURL).then((res)=>
        res.json()
      ).catch((error) => { 
        console.log(error.message); 
      });

      if(result !== undefined) {
        setHumidity(result)
        let latestObject = result[0]
        
        if( latestObject !== undefined ) {
          setLatestHumidity(latestObject)
        }     
      } 
  }

  const fetchTemperatureData = async() => {
    const result = await fetch(temperatureURL).then((res)=>
      res.json()
    ).catch((error) => { 
      console.log(error.message); 
    });

    if(result !== undefined) {
      setTemperature(result)
      let latestObject = result[0]

      if(latestObject !== undefined) {
        setLatestTemperature(latestObject)
      }   
    }
  }

  useEffect(() => {
    async function fetchData () {
        await fetchHumidityData()
    }
   fetchData()
  }, [])

  useEffect(() =>{
    async function fetchData() {
      await fetchTemperatureData()
    }
   fetchData()
  }, [])

  const refreshData = async() => {
   await fetchHumidityData()
   await fetchTemperatureData()
  }
  

  const screens = () => {
    switch (screen) {
      case 1:
        return <HomeScreen latestTemperature = {latestTemperature} latestHumidity={latestHumidity} refreshData = {refreshData} isDarkTheme={isDarkTheme}/>    
      case 2:
        return (<ControlScreen 
        setScreen={ setScreen } 
        setCurrentHumLoc = {setCurrentHumLoc}
        setCurrentTempLoc = {setCurrentTempLoc}
        currentHumLoc = {currentHumLoc}
        currentTempLoc = {currentTempLoc}
        setIsDarkTheme = {setIsDarkTheme}
        isDarkTheme={isDarkTheme}
        />)
      case 3:
        return <PinnedScreen temperature = {temperature} humidity = {humidity} setTemperature={setTemperature} setHumidity={setHumidity} isDarkTheme={isDarkTheme}/>
      case 4:
        return <MetricsScreen setScreen={ setScreen } setTemperature = {setTemperature} setHumidity={setHumidity} temperature={temperature} humidity={humidity} isDarkTheme={isDarkTheme}/>
      }
  }


  return (
    <SafeAreaView style={lightStyles.container}>
      <View style = { isDarkTheme ? darkStyles.topBar : lightStyles.topBar}>
        <TopBar/>
      </View>
        <View style = { isDarkTheme ? darkStyles.displayBox : lightStyles.displayBox}>
          {screens()}
        </View> 
      <View style={ isDarkTheme? darkStyles.navBar : lightStyles.navBar}>
        <BottomBar setScreen = { setScreen } isDarkTheme={isDarkTheme}/>
      </View>
      <StatusBar style="auto" backgroundColor={isDarkTheme ? "#183D3D" : "white"}/>
    </SafeAreaView>
  );
}
