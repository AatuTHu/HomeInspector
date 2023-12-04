import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ControlScreen from '../components/cells/ControlScreen';


describe('ControlScreen', () => {
  
  it('renders correctly', () => {
    const screen = render(<ControlScreen/>);
    expect(screen).toMatchSnapshot();
  });

  it('should change screen if all measurements button is pressed', () => {
    const setScreen = jest.fn();
    const {getByText} = render(<ControlScreen setScreen={setScreen}/>);

    const changeScreen = getByText('See all the measurements');
    fireEvent.press(changeScreen)

    expect(setScreen).toHaveBeenCalledTimes(1);
  })

  it('should turn on the lights', async() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({}),
    }));
      setLights = jest.fn()
      const { getByText } = render(<ControlScreen lights={true} setLights={setLights} />);
      fireEvent.press(getByText('lights'));
      await waitFor(() => 
        expect(getByText('On')).toBeTruthy(),
      )
  })

  it('should turn off the lights', async() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 304,
      json: () => Promise.resolve({}),
    }));
    setLights = jest.fn()
    const { getByText } = render(<ControlScreen lights={false} setLights={setLights} />);
    fireEvent.press(getByText('lights'));
    await waitFor(() => 
      expect(getByText('Off')).toBeTruthy(),
    )
    })

    it('should show option when select a sensor is pressed', () => {
      const { getByText } = render(<ControlScreen/>)
      const selectButton = getByText('Select a sensor..')

      fireEvent.press(selectButton)

      expect(getByText('humidity')).toBeTruthy();
      expect(getByText('temperature')).toBeTruthy();
    })

    it('should be able to choose a sensor from dropdown', () => {
      const { getByText, getByPlaceholderText } = render(<ControlScreen/>)
      const selectButton = getByText('Select a sensor..')

      fireEvent.press(selectButton)
      
      const humiditySensor = getByText('humidity')

      fireEvent.press(humiditySensor)

      expect(getByPlaceholderText('update location')).toBeTruthy()
      expect(getByText('Save')).toBeTruthy()
      expect(getByText('Start')).toBeTruthy()
    })

    it('should be able to save new location when selected humidity', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 202,
          json: () => Promise.resolve({}),
        }));
      
    const { getByText } = render(<ControlScreen setCurrentHumLoc={jest.fn()}/>);
    const selectButton = getByText('Select a sensor..')
     fireEvent.press(selectButton)
    const humiditySensor = getByText('humidity')
     fireEvent.press(humiditySensor)    
    const saveButton = getByText('Save');
     fireEvent.press(saveButton);

    await waitFor(() => expect(getByText('Location saved')).toBeTruthy())
  })

  it('should be able to save new location when selected temperature', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 202,
        json: () => Promise.resolve({}),
    }));
    
    const { getByText } = render(<ControlScreen setCurrentTempLoc={jest.fn()}/>);
    const selectButton = getByText('Select a sensor..')
     fireEvent.press(selectButton)
    const TemperatureSensor = getByText('temperature')
     fireEvent.press(TemperatureSensor)    
    const saveButton = getByText('Save');
     fireEvent.press(saveButton);

    await waitFor(() => expect(getByText('Location saved')).toBeTruthy())
  })

  it('should be able to start measuring', async() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({}),
    }));
    
    const setHumStarted = jest.fn()
    const { getByText } = render(<ControlScreen setHumStarted={setHumStarted} humStarted={false}/>);
    const selectButton = getByText('Select a sensor..')
     fireEvent.press(selectButton)
    const humiditySensor = getByText('humidity')
     fireEvent.press(humiditySensor)
    const startButton = getByText('Start');
     fireEvent.press(startButton)

     await waitFor(() => expect(setHumStarted).toHaveBeenCalledWith(true));
  })

});