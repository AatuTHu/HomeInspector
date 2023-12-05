import { render, fireEvent, waitFor } from '@testing-library/react-native'
import MetricScreen from '../components/cells/MetricsScreen'


describe('MetricsScreen', () => {
    it('should render metrics on screen', () => {
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12"}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12"}]
        const screen = render(<MetricScreen humidity={humidity} temperature={temperature}/>);
        expect(screen).toMatchSnapshot();
    })

    it('should render with empty arrays', () => {
        const { getByText } = render(<MetricScreen humidity={""} temperature={""}/>)

        expect(getByText('No metric data found')).toBeTruthy();
    })

    it('should render pin and delete buttons', () => {
        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12"}]
        const temperature = [{temperature: 25, id: 2, location: 'Living Room', time: "13:00",date:"09.12"}]
        const { getAllByText } = render(<MetricScreen humidity={humidity} temperature={temperature}/>)

        expect(getAllByText("Pin")).toBeTruthy()
        expect(getAllByText("Delete")).toBeTruthy()
    })

    it('should Pin a metric if pin button is pressed', async() => {
        global.fetch = jest.fn(() =>
        Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
        }))

        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12"}]
        const mockSetHumidity = jest.fn()
        const { getByText } = render(<MetricScreen humidity={humidity} temperature={""} setHumidity={mockSetHumidity} setTemperature={jest.fn()}/>)

        expect(getByText("Pin")).toBeTruthy()
        expect(getByText("Delete")).toBeTruthy()

        const pinButton = getByText("Pin")

        fireEvent.press(pinButton)

        await waitFor(() => {
            expect(mockSetHumidity).toHaveBeenCalled()
        })
    })

    it('should delete a metric if delete button is pressed', async() => {
        global.fetch = jest.fn(() =>
        Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
        }))

        const humidity = [{humidity: 23, id: 1, location: 'Kitchen', time: "12:00",date:"11.12"}]
        const mockSetHumidity = jest.fn()
        const { getByText } = render(<MetricScreen humidity={humidity} temperature={""} setHumidity={mockSetHumidity} setTemperature={jest.fn()}/>)

        expect(getByText("Pin")).toBeTruthy()
        expect(getByText("Delete")).toBeTruthy()

        const deleteButton = getByText("Delete")

        fireEvent.press(deleteButton)

        await waitFor(() => {
            expect(mockSetHumidity).toHaveBeenCalled()
        })
    })
})