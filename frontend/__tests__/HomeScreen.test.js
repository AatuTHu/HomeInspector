import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../components/screens/HomeScreen';

describe('HomeScreen', () => {

  test('renders initial state correctly', () => {

    const { getAllByText } = render(
      <HomeScreen temperature={20} humidity={50} location= {'Living Room'} time="12:00" fetchData={() => {}} />
    );
  
    expect(getAllByText('20 °C')).toBeTruthy();
    expect(getAllByText('50 %')).toBeTruthy();
    expect(getAllByText('Living Room')).toBeTruthy();
    expect(getAllByText('12:00')).toBeTruthy();
  }); 
});
