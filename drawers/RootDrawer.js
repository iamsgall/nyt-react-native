import { createDrawerNavigator } from '@react-navigation/drawer'
import { Layout, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import HomeStack from '../stacks/HomeStack'

export default function RootDrawer() {
  const { Navigator, Screen } = createDrawerNavigator()

  return (
    <Navigator>
      <Screen
        name='Home'
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

const styles = StyleSheet.create({})
