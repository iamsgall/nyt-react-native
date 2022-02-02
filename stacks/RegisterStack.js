import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screenOptions } from '../shared/screenOptions'
import WelcomeScreen from '../screens/WelcomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import RootDrawer from '../drawers/RootDrawer'

export default function RegisterStack() {
  const { Navigator, Screen } = createNativeStackNavigator()

  return (
    <Navigator screenOptions={screenOptions(false)}>
      <Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={screenOptions(true, '')}
      />

      <Screen
        name='SignInScreen'
        component={SignInScreen}
        options={screenOptions(false, '')}
      />
      <Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={screenOptions(false, '')}
      />
      <Screen
        name='RootDrawer'
        component={RootDrawer}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}
