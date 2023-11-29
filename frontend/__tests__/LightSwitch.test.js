import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LightSwitch from '../components/molecules/LightSwitch';

// Mock the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
);

describe('LightSwitch', () => {
afterEach(() => {
  jest.clearAllMocks();
});

it('should render correctly', () => {
  const { getByText } = render(<LightSwitch lights={false} setLights={jest.fn()} />);
  expect(getByText('Off')).toBeTruthy();
});

it('should turn lights ON and button is pressed', async () => {

  global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
  }));

  setLights = jest.fn()
  const { getByText } = render(<LightSwitch lights={true} setLights={setLights} />);
  fireEvent.press(getByText('lights'));
  await waitFor(() => 
    expect(getByText('On')).toBeTruthy(),
  )}
)


it('should turn lights OFF and button is pressed', async () => {
  global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 304,
        json: () => Promise.resolve({}),
  }));

  setLights = jest.fn()
  const { getByText } = render(<LightSwitch lights={false} setLights={setLights} />);
  fireEvent.press(getByText('lights'));
  await waitFor(() => 
    expect(getByText('Off')).toBeTruthy()
  )
})

});
