import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { enableFetchMocks } from 'jest-fetch-mock';
import ControlScreen from '../components/screens/ControlScreen';

enableFetchMocks();

describe('ControlScreen', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  })
  
  it('renders correctly with custom props', () => {
    const screen = render(<ControlScreen ssid = { 'WiFi' } location = { 'LivingRoom' } />);
    expect(screen).toMatchSnapshot();
  });

  it('tells server to start measurement and updates statusText', async () => {

    // Mocking the fetch function
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
  
    const { getByText } = render(<ControlScreen/>);
  
    const startButton = getByText('start');
    fireEvent.press(startButton);
  
    await waitFor(() => {
      expect(getByText('Measurements started')).toBeDefined(); 
    });
  });

  it('tells server to turn on the lights and updates statusText', async () => {

    // Mocking the fetch function
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
  
    const { getByText } = render(<ControlScreen/>);
  
    const lightSwitchButton = getByText('lights');
    fireEvent.press(lightSwitchButton);
  
    await waitFor(() => {
      expect(getByText('Lights On')).toBeDefined(); 
    });
  });

  
  it('tells server to save new Location and updates statusText', async () => {

    // Mocking the fetch function
    fetch.mockResponseOnce(JSON.stringify({ status: 200 }));
  
    const { getByText } = render(<ControlScreen/>);
  
    const saveLocationButton = getByText('save');
    fireEvent.press(saveLocationButton);
  
    await waitFor(() => {
      expect(getByText('Location switched')).toBeDefined(); 
    });
  });
  

});