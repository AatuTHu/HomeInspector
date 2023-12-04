import PinnedScreen from "../components/cells/PinnedScreen"
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('PinnedScreen', () => {
    it('should render', () => {
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12", pinned: true}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12", pinned: true}]
        const {getByText} = render(<PinnedScreen temperature={temperature} humidity={humidity}/>);
        expect(getByText("temperature")).toBeTruthy();
        expect(getByText("humidity")).toBeTruthy();
    })

    it('shows a message if no pinns have not been made', () => {
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12", pinned: false}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12", pinned: false}]
        const {getByText} = render(<PinnedScreen temperature={temperature} humidity={humidity}/>);
        expect(getByText('No temperatures pinned')).toBeTruthy()
        expect(getByText('No humidities pinned')).toBeTruthy()
    })

    it('should render temperatures and say no pinned humidities', () => {
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12", pinned: true}]
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12", pinned: false}]   
        const {getByText} = render(<PinnedScreen temperature={temperature} humidity={humidity}/>);
        expect(getByText('temperature')).toBeTruthy()
        expect(getByText('No humidities pinned')).toBeTruthy()
        expect(getByText('Living Room')).toBeTruthy()
        expect(getByText('add')).toBeTruthy()
        expect(getByText('unpin')).toBeTruthy()
    })
})