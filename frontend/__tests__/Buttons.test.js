import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Buttons from '../components/screens/atoms/Buttons';

describe('Buttons', () => {

    it('Renders correctly', () => {
        const screen = render(<Buttons text = "save" type = "save"/>);
        expect(screen).toMatchSnapshot();
    })

    it('fires a function on press', () => {
        mockOnPressFunction = jest.fn();
        const  {getByText}  = render(<Buttons onPress = { mockOnPressFunction } text = "test"/>)
        const pressButton = getByText('test')
        fireEvent.press(pressButton)

        expect(mockOnPressFunction).toHaveBeenCalled();
    })

    it('fires a function one time', () => {
        mockOnPressFunction = jest.fn();
        const  {getByText}  = render(<Buttons onPress = { mockOnPressFunction } text = "test"/>)
        const pressButton = getByText('test')
        fireEvent.press(pressButton)

        expect(mockOnPressFunction).toHaveBeenCalledTimes(1);
    })

})

