import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BottomBar from '../components/atoms/BottomBar';

describe('BottomBar', () => {
  it('renders correctly with custom props', () => {
    const screen = render(<BottomBar />);
    expect(screen).toMatchSnapshot();
  });

  it('Switches screens', () => {
    
    const mockFunction = jest.fn();

    const { getByText } = render(<BottomBar setScreen = {mockFunction}/>);
  
    const screen1 = getByText('Notes');
    const screen2 = getByText('Home');
    const screen3 = getByText('Control');

    fireEvent.press(screen1);
    fireEvent.press(screen2);
    fireEvent.press(screen3);

    expect(mockFunction).toBeCalled();

  })
});
