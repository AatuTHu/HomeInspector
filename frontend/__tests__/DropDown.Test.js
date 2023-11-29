import { fireEvent, render } from '@testing-library/react-native';
import DropDown from '../components/molecules/DropDown';


describe('DropDown', () => {

    it('should render correctly', () => {
        const { getByText } = render(<DropDown/>)
        expect(getByText('Select a sensor..')).toBeTruthy();
    })

    it('should show given options on button press', () => {
        const options = [
            {id : 1 ,name : "humidity", value : "humidity"},
            {id : 2, name : "temperature", value : "temperature"}]

        const { getByText } = render(<DropDown options={options}/>)
        const selectButton = getByText('Select a sensor..')

        fireEvent.press(selectButton)

        expect(getByText('humidity')).toBeTruthy();
        expect(getByText('temperature')).toBeTruthy();
    })

    it('should choose a sensor option on button press', () => {

        const options = [{id : 1 ,name : "humidity", value : "humidity"}]
        const setSelected = jest.fn()

        const { getByText } = render(<DropDown options={options} setSelected={setSelected}/>)
        const selectButton = getByText('Select a sensor..')

        fireEvent.press(selectButton)
        expect(getByText('humidity')).toBeTruthy();

        const sensorPress = getByText('humidity')
        fireEvent.press(sensorPress)

        expect(setSelected).toHaveBeenCalledTimes(1);
        
    })
})