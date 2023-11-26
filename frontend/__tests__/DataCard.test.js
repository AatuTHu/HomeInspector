import { render, fireEvent } from '@testing-library/react-native';
import DataCard from '../components/atoms/DataCard';

describe('DataCard', () => {

    it('Renders Correctly', () => {
        const data = '12 %' 
        const location= 'Living Room'
        const time= '11:00' 
        const { getByText } = render(
        <DataCard 
            data = {data} 
            location={location} 
            time={time} 
        />)

        expect(getByText(data)).toBeTruthy()
        expect(getByText(location)).toBeTruthy()
        expect(getByText(time)).toBeTruthy()       
    })
})