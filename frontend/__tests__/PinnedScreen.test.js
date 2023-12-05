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

    it('should tell user that adding a note was success', async() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            status: 200,
            json: () => Promise.resolve({}),
        }));
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12", pinned: true}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12", pinned: true}]
        const {getAllByText, getByText} = render(<PinnedScreen temperature={temperature} humidity={humidity}/>);

        const addButton = getAllByText('add')
        const firstAddButton = addButton[0]

        fireEvent.press(firstAddButton)
        await waitFor(() => {
            expect(getByText('note added')).toBeTruthy();
        }) 
    })

    it('should tell user if something went wrong when adding a note', async() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            status: 304,
            json: () => Promise.resolve({}),
        }));
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12", pinned: true}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12", pinned: true}]
        const {getAllByText, getByText} = render(<PinnedScreen temperature={temperature} humidity={humidity}/>);

        const addButton = getAllByText('add')
        const firstAddButton = addButton[0]

        fireEvent.press(firstAddButton)
        await waitFor(() => {
            expect(getByText('something went wrong')).toBeTruthy();
        }) 
    })

    it('should use the function unpin when user presses unpin button', async() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
            status: 200,
            json: () => Promise.resolve({}),
        }));
        const mockSetFunction = jest.fn()
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12", pinned: true}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12", pinned: true}]
        const {getAllByText} = render(<PinnedScreen temperature={temperature} humidity={humidity} setHumidity={mockSetFunction} setTemperature={mockSetFunction}/>);

        const unPinButton = getAllByText('unpin')
        const firstUnpinButton = unPinButton[0]

        fireEvent.press(firstUnpinButton)

        await waitFor(() => {
            expect(mockSetFunction).toHaveBeenCalled();
        })      
    })
})