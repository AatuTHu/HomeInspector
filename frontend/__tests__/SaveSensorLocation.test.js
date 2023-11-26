import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { enableFetchMocks } from 'jest-fetch-mock'
import SaveSensorLocation from '../components/molecules/SaveSensorLocation';

enableFetchMocks();

describe('SaveSensorLocation', () => {

    afterEach(() => {
        jest.clearAllMocks();
      })

    it('renders correctly', () => {
        const screen = render(<SaveSensorLocation/>);
        expect(screen).toMatchSnapshot();
    });

    it('tells server to save new Location and updates statusText', async () => {

      mockFunction = jest.fn()
        fetch.mockResponseOnce(JSON.stringify(), {
          status: 202,
         });
      
        const { getByText } = render(<SaveSensorLocation locationURL='' setStatusText={mockFunction}/>);
      
        const saveLocationButton = getByText('save');
        fireEvent.press(saveLocationButton);
      
        await waitFor(() => {
          expect(getByText('Location switched')).toBeDefined(); 
        });
      });
      
      it('shows error if save location post request fails', async () => {

        mockFunction = jest.fn()

        fetch.mockResponseOnce(JSON.stringify(), {
          status: 403,
         });
        
        const { getByText } = render(<SaveSensorLocation locationURL='' setStatusText={mockFunction}/>)
    
        const saveLocationButton = getByText('save');
    
        fireEvent.press(saveLocationButton);
    
        await waitFor(() => {
          expect(getByText('There was an error, Try again later')).toBeDefined(); 
        });
    
      })
})