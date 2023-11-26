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

    const humidity = [{humidity: 23, id: 1, location: 'Kitchen'}]
    const temperature = [{temperature: 25, id: 2, location: 'Living Room'}]

    const { getAllByText } = render(  
      <HomeScreen  humidity={humidity} temperature={temperature}/>
    );
  
    expect(getAllByText('25 °C')).toBeTruthy()
    expect(getAllByText('23 %')).toBeTruthy()
    expect(getAllByText('Living Room')).toBeTruthy()
    expect(getAllByText('Kitchen')).toBeTruthy()
  });

  it('should Render one DataCard if either only temperature has been given', () => {
    const temperature = [{temperature: 20, id: 1, location: 'Living Room'}]
    const { getByText } = render(<HomeScreen temperature={temperature}/>)

    expect(getByText('20 °C')).toBeTruthy()
    expect(getByText('Living Room')).toBeTruthy()
  })

  it('should Render one DataCard if either only humidity has been given', () => {
    const humidity = [{humidity: 23, id: 1, location: 'Kitchen'}]
    const { getByText } = render(<HomeScreen humidity={humidity}/>)

    expect(getByText('23 %')).toBeTruthy()
    expect(getByText('Kitchen')).toBeTruthy()
  }) 

});
