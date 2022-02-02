import { Alert, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Layout, Button, MenuItem, OverflowMenu } from '@ui-kitten/components'
import { LogoutIcon, PersonIcon } from '../icons/evaIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getAuth } from 'firebase/auth'
import { ThemeContext } from '../context/themeContext'
import { useNavigation } from '@react-navigation/core'
import UserContext from '../context/User/UserContext'

export default function LogoutButton() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [visible, setVisible] = useState(false)
  const auth = getAuth()
  const themeContext = useContext(ThemeContext)
  const navigation = useNavigation()
  const { userProfile, getUserProfile } = useContext(UserContext)

  useEffect(() => {
    getUserProfile()
  }, [])

  const onItemSelect = index => {
    setSelectedIndex(index)
    setVisible(false)
  }

  const renderToggleButton = () => (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <Layout style={styles.btnAccount}>
        <PersonIcon />
      </Layout>
    </TouchableOpacity>
  )

  const signOutButton = () => {
    auth
      .signOut(auth)
      .then(() => {
        console.log('Sign-out successful')
        if (userProfile.displayName === null) {
          Alert.alert(`Guess sign out successfully`)
          // navigation.navigate('RegisterStack')
          navigation.popToTop()
        } else {
          Alert.alert(`${userProfile.displayName} sign out successfully`)
          // navigation.navigate('RegisterStack')
          navigation.popToTop()
        }
      })
      .catch(err => console.log(err.message))
  }
  return (
    <Layout level='1'>
      {userProfile ? (
        <OverflowMenu
          anchor={renderToggleButton}
          visible={visible}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={() => setVisible(false)}
        >
          <MenuItem
            title='Logout'
            onPress={() => signOutButton()}
            accessoryLeft={
              themeContext.theme === 'light' ? (
                <LogoutIcon tintColor='#222B45' />
              ) : (
                <LogoutIcon tintColor='#E4E9F2' />
              )
            }
          />
        </OverflowMenu>
      ) : null}
    </Layout>
  )
}

const styles = StyleSheet.create({
  btnAccount: {
    height: 34,
    width: 34,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4E9F2',
  },
})
