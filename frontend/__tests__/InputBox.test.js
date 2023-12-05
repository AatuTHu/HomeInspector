import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InputBox from '../components/atoms/InputBox'


describe('InputBox', () => {
test('renders the TextInput component with placeholder', () => {
	const placeholder = 'Enter text here'
	const { getByPlaceholderText } = render(<InputBox placeholder={placeholder} />)

	const textInput = getByPlaceholderText(placeholder)
	expect(textInput).toBeTruthy()
})

test('calls newText function when text is entered', () => {
	const newTextMock = jest.fn()
	const placeholder = 'Enter text here'
	const { getByPlaceholderText } = render(<InputBox newText={newTextMock} placeholder={placeholder} />)

	const textInput = getByPlaceholderText(placeholder)

	fireEvent.changeText(textInput, 'Hello, World!')

	expect(newTextMock).toHaveBeenCalledWith('Hello, World!')
})
})



