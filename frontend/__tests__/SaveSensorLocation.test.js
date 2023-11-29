import React from 'react';
import SaveSensorLocation from '../components/molecules/SaveSensorLocation';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('SaveSensorLocation', () => {

afterEach(() => {
  jest.clearAllMocks();
})

it('renders correctly', () => {
  const screen = render(<SaveSensorLocation/>);
  expect(screen).toMatchSnapshot();
});

  

it('should set statusText to "Location saved" when response status is 202', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 202,
        json: () => Promise.resolve({}),
      })
    );
    const { getByText } = render(<SaveSensorLocation setCurrentTempLoc={jest.fn()} setCurrentHumLoc={jest.fn()} selected = "humidity"/>);
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);
    await waitFor(() => expect(getByText('Location saved')).toBeTruthy());
})


it('should set statusText to "There was an error, Try again later" when response status is 403', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 403,
      json: () => Promise.resolve({}),
    })
  );

  const { getByText } = render(<SaveSensorLocation setCurrentTempLoc={jest.fn()} setCurrentHumLoc={jest.fn()} selected = "humidity"/>);
  const saveButton = getByText('Save');
  fireEvent.press(saveButton);
  await waitFor(() => expect(getByText('There was an error, Try again later')).toBeTruthy());
})
})