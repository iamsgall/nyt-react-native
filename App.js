import { StyleSheet, StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import AppNavigator from './stacks/AppNavigator'
import { useState } from 'react'
import { ThemeContext } from './context/themeContext'
import BookState from './context/Book/BookState'
import { StripeProvider } from '@stripe/stripe-react-native'
import { STRIPE_PUBLISHABLE_KEY } from '@env'
import UserState from './context/User/UserState'

export default function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  return (
    <>
      {theme === 'light' ? (
        <StatusBar barStyle='dark-content' />
      ) : (
        <StatusBar barStyle='light-content' />
      )}
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <UserState>
            <BookState>
              <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
                <AppNavigator />
              </StripeProvider>
            </BookState>
          </UserState>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  )
}
const styles = StyleSheet.create({})
