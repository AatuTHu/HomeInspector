import { render, fireEvent, waitFor } from '@testing-library/react-native';
import StartMeasuring from '../components/molecules/StartMeasuring';

global.fetch = jest.fn(() =>
Promise.resolve({
  status: 200,
  json: () => Promise.resolve({}),
})
);

describe('StartMeasuring', () => {

afterEach(() => {
    jest.clearAllMocks();
  })

it('renders correctly', () => {
    const screen = render(<StartMeasuring/>);
    expect(screen).toMatchSnapshot();
});

it('should start measuring temperature when response status is 200', async () => {

  const setTempStarted = jest.fn()
  const { getByText } = render(<StartMeasuring selected="temperature" setTempStarted={setTempStarted} tempStarted={false}/>);
  const startButton = getByText('Start');
  fireEvent.press(startButton);
  await waitFor(() => expect(setTempStarted).toHaveBeenCalledWith(true));
});

it('should start measuring humidity when response status is 200', async () => {

  const setHumStarted = jest.fn();
  const { getByText } = render(<StartMeasuring selected="humidity" setHumStarted={setHumStarted} humStarted={false} />);
  const startButton = getByText('Start');
  fireEvent.press(startButton);
  await waitFor(() => expect(setHumStarted).toHaveBeenCalledWith(true));
})
    
})