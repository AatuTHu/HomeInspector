import React from 'react';
import SaveSensorLocation from '../components/molecules/SaveSensorLocation';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { enableFetchMocks } from 'jest-fetch-mock'

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

      mockStatus = jest.fn()
      mockFunction = jest.fn()
        fetch.mockResponseOnce(JSON.stringify(), {
          status: 202,
         });
      
        const { getByText } = render(<SaveSensorLocation locationURL='' statusText={mockStatus} setStatusText={mockFunction}/>);
      
        const saveLocationButton = getByText('Save');
        fireEvent.press(saveLocationButton);
      
        await waitFor(() => {
          expect(getByText('Location saved')).toBeDefined(); 
        });
      });
      
      it('shows error if save location post request fails', async () => {

        mockFunction = jest.fn()
        mockStatus = jest.fn()

        fetch.mockResponseOnce(JSON.stringify(), {
          status: 403,
         });
        
        const { getByText } = render(<SaveSensorLocation locationURL = '' statusText={mockStatus} setStatusText={mockFunction}/>)
    
        const saveLocationButton = getByText('Save');
    
        fireEvent.press(saveLocationButton);
    
        await waitFor(() => {
          expect(getByText('There was an error, Try again later')).toBeDefined(); 
        });
    
      })
})