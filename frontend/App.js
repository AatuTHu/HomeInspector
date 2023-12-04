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

  const [screen, setScreen] = useState(1)
  const [lights, setLights] = useState(false)

  const [temperature, setTemperature] = useState([])
  const [latestTemperature, setLatestTemperature] = useState([])
  const [tempStarted, setTempStarted] = useState(false)
  const [currentTempLoc, setCurrentTempLoc] = useState('')

  const [humidity, setHumidity] = useState([])
  const [latestHumidity, setLatestHumidity] = useState([])
  const [humStarted, setHumStarted] = useState(false)
  const [currentHumLoc, setCurrentHumLoc] = useState('')


  const fetchHumidityData = async() => {
    const result = await fetch(humidityURL).then((res)=>
        res.json()
      ).catch((error) => { 
        console.log(error.message); 
      });

      if(result !== undefined) {
        setHumidity(result)
        let latestObject = result[result.length-1]
        
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
      let latestObject = result[result.length-1]

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
    fetchHumidityData()
    fetchTemperatureData()
  }
  

  const screens = () => {
    switch (screen) {
      case 1:
        return <HomeScreen latestTemperature = {latestTemperature} latestHumidity={latestHumidity} refreshData = {refreshData}/>    
      case 2:
        return (<ControlScreen 
        setScreen={ setScreen } 
        setTempStarted = { setTempStarted } 
        tempStarted = { tempStarted }
        setHumStarted = { setHumStarted } 
        humStarted = { humStarted } 
        setCurrentHumLoc = {setCurrentHumLoc}
        setCurrentTempLoc = {setCurrentTempLoc}
        currentHumLoc = {currentHumLoc}
        currentTempLoc = {currentTempLoc}
        setLights = {setLights}
        lights = {lights}
        />)
      case 3:
        return <PinnedScreen temperature = {temperature} humidity = {humidity} setTemperature={setTemperature} setHumidity={setHumidity}/>
      case 4:
        return <MetricsScreen setScreen={ setScreen } setTemperature = {setTemperature} setHumidity={setHumidity} temperature={temperature} humidity={humidity}/>
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
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}
