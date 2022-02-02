import { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

export const ThemeStyle = () => {
  const themeContext = useContext(ThemeContext)

  if (themeContext.theme === 'light') {
    return '#fff'
  } else {
    return '#222B45'
  }
}

export const BackgroundStyle = () => {
  const themeContext = useContext(ThemeContext)

  if (themeContext.theme === 'light') {
    return '#F6F9FC'
  } else {
    return '#1A2138'
  }
}
