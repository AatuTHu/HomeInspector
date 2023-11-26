import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { enableFetchMocks } from 'jest-fetch-mock'
import ControlScreen from '../components/cells/ControlScreen';

enableFetchMocks();

describe('ControlScreen', () => {
  
  it('renders correctly', () => {
    const screen = render(<ControlScreen/>);
    expect(screen).toMatchSnapshot();
  });

});