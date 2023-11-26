import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import HomeScreen from '../components/cells/HomeScreen'

describe('HomeScreen', () => {
  
  
  it('Renders InfoBox when no temperature or humidity is available', () => {
    
    const { getAllByText } = render(
      <HomeScreen/>
    );

    expect(getAllByText('No measurements found')).toBeTruthy()
  })

  it('renders initial state correctly', () => {

    const temperature = 20
    const humidity= 50
    const location= 'Living Room'
    const time= '12:00'

    const { getAllByText } = render(
      <HomeScreen temperature={temperature} humidity={humidity} location={location} time={time}/>
    );
  
    expect(getAllByText('20 °C')).toBeTruthy()
    expect(getAllByText('50 %')).toBeTruthy()
    expect(getAllByText('Living Room')).toBeTruthy()
    expect(getAllByText('12:00')).toBeTruthy()
  });

  it('should Render one DataCard if either only temperature has been given', () => {
    const temperature = 20
    const location= 'Living Room'
    const time= '12:00'
    const { getByText } = render(<HomeScreen temperature={temperature} location={location} time={time}/>)

    expect(getByText('20 °C')).toBeTruthy()
    expect(getByText('Living Room')).toBeTruthy()
    expect(getByText('12:00')).toBeTruthy()
  })

  it('should Render one DataCard if either only humidity has been given', () => {
    const humidity = 25
    const location= 'Kitchen'
    const time= '13:00'
    const { getByText } = render(<HomeScreen humidity={humidity} location={location} time={time}/>)

    expect(getByText('25 %')).toBeTruthy()
    expect(getByText('Kitchen')).toBeTruthy()
    expect(getByText('13:00')).toBeTruthy()
  }) 

});
