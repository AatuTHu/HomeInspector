import PinnedScreen from "../components/cells/PinnedScreen"
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('PinnedScreen', () => {
    it('should render', () => {
        const screen = render(<PinnedScreen/>);
        expect(screen).toMatchSnapshot();
    })

    it('shows a message if no pinns have not been made', () => {
        const {getByText} = render(<PinnedScreen/>);
        expect(getByText('No pinns made yet')).toBeTruthy()
    })
})