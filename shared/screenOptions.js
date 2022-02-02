import { Text } from '@ui-kitten/components'
import { useContext } from 'react'
import LogoutButton from '../components/LogoutButton'
import { ThemeContext } from '../context/themeContext'
import ToggleThemeHeader from '../shared/ToggleThemeHeader'

export const screenOptions = (themeBool, title) => {
  const themeContext = useContext(ThemeContext)

  if (themeContext.theme === 'light' && themeBool === true) {
    return {
      headerLeft: () => <ToggleThemeHeader />,
      headerTintColor: '#222B45',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitle: title,
      headerRight: () => <LogoutButton />,
    }
  } else if (themeContext.theme === 'dark' && themeBool === true) {
    return {
      headerLeft: () => <ToggleThemeHeader />,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#222B45',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },

      headerTitle: title,
      headerRight: () => <LogoutButton />,
    }
  } else if (themeContext.theme === 'light' && themeBool === false) {
    return {
      // headerLeft: () => <ToggleThemeHeader />,
      headerTintColor: '#222B45',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },

      headerTitle: title,
      headerRight: () => <LogoutButton />,
    }
  } else if (themeContext.theme === 'dark' && themeBool === false) {
    return {
      // headerLeft: () => <ToggleThemeHeader />,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#222B45',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitle: title,
      headerRight: () => <LogoutButton />,
    }
  }
}
