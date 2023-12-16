import { Text, View } from 'react-native';
import { lightStyles } from '../../styles/lightStyles'
import { darkStyles } from '../../styles/darkStyles';

export default function TopBar({}) {
  return (
    <View>
        <Text style = {lightStyles.title}>HomeInspector</Text>
    </View>
  )
}