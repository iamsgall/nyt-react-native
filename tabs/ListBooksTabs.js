import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ThemeStyle } from '../shared/ThemeStyle'
import { Ionicons } from '@expo/vector-icons'
import ListBooksScreen from '../screens/ListBooksScreen'
import FavoritesBooksScreen from '../screens/FavoritesBooksScreen'
import { screenOptions } from '../shared/screenOptions'

export default function ListBooksTabs({ route }) {
  const themeStyle = ThemeStyle()
  const { Navigator, Screen } = createBottomTabNavigator()
  const { list_name, list_name_encoded } = route.params

  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Books') {
            iconName = focused ? 'book' : 'book-outline'
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'bookmark' : 'bookmark-outline'
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#FF3E38',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: themeStyle,
        },
      })}
    >
      <Screen
        name='Books'
        component={ListBooksScreen}
        options={{ headerShown: false }}
        initialParams={{ list_name, list_name_encoded }}
      />
      <Screen
        name='Favorites'
        component={FavoritesBooksScreen}
        options={{ headerShown: false, title: 'Favorites' }}
      />
    </Navigator>
  )
}
