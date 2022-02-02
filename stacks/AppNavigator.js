import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import RegisterStack from './RegisterStack'
// import HomeStack from './HomeStack'

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RegisterStack />
        {/* <HomeStack /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
