import React from 'react'
import { render } from '@testing-library/react-native'
import HomeScreen from '../components/cells/HomeScreen'

describe('HomeScreen', () => {

  it('Renders InfoBox when no temperature or humidity is available', () => {
    
    const { getAllByText } = render(
      <HomeScreen/>
    );

    expect(getAllByText('No measurements found')).toBeTruthy()
  })

  it('renders initial state correctly', () => {

    const humidity = {humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12"}
    const temperature = {temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12"}

    const { getAllByText } = render(  
      <HomeScreen  latestHumidity={humidity} latestTemperature={temperature}/>
    );
    expect(getAllByText('25 °C')).toBeTruthy()
    expect(getAllByText('23 %')).toBeTruthy()
    expect(getAllByText('Living Room')).toBeTruthy()
    expect(getAllByText('Kitchen')).toBeTruthy()
  });

  it('should Render one DataCard if only temperature has been given', () => {
    const temperature = {temperature: 25, id: 1, location: 'Living Room', time: "12:00",date:"11.12"}
    const { getByText } = render(<HomeScreen latestTemperature={temperature}/>)

    expect(getByText('25 °C')).toBeTruthy()
    expect(getByText('Living Room')).toBeTruthy()
    expect(getByText('11.12 - 12:00')).toBeTruthy()
  })

  it('should Render one DataCard if only humidity has been given', () => {
    const humidity = {humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12"}
    const { getByText } = render(<HomeScreen latestHumidity={humidity}/>)

    expect(getByText('23 %')).toBeTruthy()
    expect(getByText('Kitchen')).toBeTruthy()
    expect(getByText('11.12 - 12:00')).toBeTruthy()
  }) 

});
