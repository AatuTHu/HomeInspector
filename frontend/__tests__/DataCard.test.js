import { render, fireEvent } from '@testing-library/react-native';
import DataCard from '../components/molecules/DataCard';

describe('DataCard', () => {

    it('Renders Correctly', () => {
        const data = '12' 
        const location= 'Living Room'
        const time = '11:00'
        const date = '28.11'
        const title = 'Humidity'
        const unit = '%'
        const { getByText } = render(
        <DataCard 
            data = {data} 
            location={location} 
            time={time} 
            date= {date}
            title={title}
            unit={unit}
            cardType="big"
        />)

        expect(getByText(data + " "+unit)).toBeTruthy()
        expect(getByText(location)).toBeTruthy()
        expect(getByText(title)).toBeTruthy()
        expect(getByText(date + " - " + time)).toBeTruthy()

    })
})