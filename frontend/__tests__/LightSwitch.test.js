import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { enableFetchMocks } from 'jest-fetch-mock'
import LightSwitch from "../components/molecules/LightSwitch";

enableFetchMocks();

describe('lightSwitch', () => {

    afterEach(() => {
        jest.clearAllMocks();
      })
    
    it('renders correctly', () => {
        const screen = render(<LightSwitch/>);
        expect(screen).toMatchSnapshot();
    });

    it('tells server to turn on the lights and updates statusText', async () => {
    
    mockFunction = jest.fn()
    // Mocking the fetch function
        fetch.mockResponseOnce(JSON.stringify(), {
        status: 202,
        });
    
    const { getByText } = render(<LightSwitch lightURL='' setStatusText={mockFunction}/>);
    
    const lightSwitchButton = getByText('lights');
    fireEvent.press(lightSwitchButton);
    
    await waitFor(() => {
        expect(getByText('On')).toBeDefined(); 
    });
    });

    
    it('shows error if lightSwitch post request fails', async () => {
    mockFunction = jest.fn()
    fetch.mockResponseOnce(JSON.stringify(), {
        status: 403,
        });

    const { getByText } = render(<LightSwitch lightURL='' setStatusText={mockFunction}/>)

    const lightSwitchButton = getByText('lights');

    fireEvent.press(lightSwitchButton);

    await waitFor(() => {
        expect(getByText('Off')).toBeDefined(); 
    });

    })


})
