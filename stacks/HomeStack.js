import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenOptions } from '../shared/screenOptions'
import HomeScreen from '../screens/HomeScreen'
import ListBooksTabs from '../tabs/ListBooksTabs'

export default function HomeStack() {
  const { Navigator, Screen } = createNativeStackNavigator()

  return (
    <Navigator>
      <Screen
        name='HomeScreen'
        component={HomeScreen}
        options={screenOptions(false, '')}
      />
      <Screen
        name='ListBooksTabs'
        component={ListBooksTabs}
        options={screenOptions(false, '')}
      />
    </Navigator>
  )
}
