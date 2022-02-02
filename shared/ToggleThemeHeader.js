import { Layout, Text, Toggle } from '@ui-kitten/components'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ThemeContext } from '../context/themeContext'

export default function ToggleThemeHeader() {
  const themeContext = useContext(ThemeContext)

  const [checked, setChecked] = useState(false)

  const onCheckedChange = isChecked => {
    setChecked(isChecked)
    themeContext.toggleTheme(true)
  }

  return (
    <Toggle
      status='danger'
      checked={checked}
      onChange={onCheckedChange}
      status='danger'
    >
      <Layout>
        <Text style={styles.toggleText} category='s1' status='basic'>
          {checked
            ? `${themeContext.theme} Mode`
            : `${themeContext.theme} Mode`}
        </Text>
      </Layout>
    </Toggle>
  )
}

const styles = StyleSheet.create({
  toggleText: {
    textTransform: 'capitalize',
  },
})
