import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { enableFetchMocks } from 'jest-fetch-mock'
import StartMeasuring from '../components/molecules/StartMeasuring';

enableFetchMocks();

describe('StartMeasuring', () => {

    afterEach(() => {
        jest.clearAllMocks();
      })
    
    it('renders correctly with custom props', () => {
        const screen = render(<StartMeasuring/>);
        expect(screen).toMatchSnapshot();
    });

    it('tells server to start measurement and updates statusText', async () => {
        mockFunction = jest.fn()
        // Mocking the fetch function
        fetch.mockResponseOnce(JSON.stringify(), {
          status: 202,
         });
      
        const { getByText } = render(<StartMeasuring startURL='' setStatusText={mockFunction}/>);
      
        const startButton = getByText('start');
        fireEvent.press(startButton);
      
        await waitFor(() => {
          expect(getByText('On')).toBeDefined(); 
        });
      });

      it('shows error if start post request fails', async () => {
        mockFunction = jest.fn()
        fetch.mockResponseOnce(JSON.stringify(), {
          status: 403,
         });
    
        const { getByText } = render(<StartMeasuring startURL= '' setStatusText={mockFunction}/>)
    
        const startButton = getByText('start');
    
        fireEvent.press(startButton);
    
        await waitFor(() => {
          expect(getByText('Off')).toBeDefined(); 
        });
    
      })
    
})