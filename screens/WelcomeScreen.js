import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Layout, Text } from '@ui-kitten/components'
import { ThemeStyle } from '../shared/ThemeStyle'
import welcomeImage from '../assets/2.png'
import { signInAnonymously, getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'

export default function WelcomeScreen({ navigation }) {
  const themeStyle = ThemeStyle()
  const auth = getAuth()
  // const navigation = useNavigation()

  const signInGuess = () => {
    signInAnonymously(auth)
      .then(() => {
        navigation.navigate('RootDrawer')
      })
      .catch(err => {
        console.log(err.code, err.message)
      })
  }

  return (
    <SafeAreaView style={{ backgroundColor: themeStyle, flex: 1 }}>
      <Layout
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <Text category='h1' style={{ fontSize: 44 }}>
          Welcome!
        </Text>
        <Text
          appearance='hint'
          style={{ marginTop: 8, marginBottom: 24, fontSize: 16 }}
        >
          Sign in or create a new account
        </Text>
        <ImageBackground
          resizeMode='contain'
          style={{ width: 280, height: 280, marginBottom: 16 }}
          source={welcomeImage}
        />
        <Button
          style={{ width: '85%', marginVertical: 8 }}
          size='large'
          status='danger'
          onPress={() => navigation.navigate('SignInScreen')}
        >
          Go to Sign in
        </Button>
        <Button
          style={{ width: '85%', marginVertical: 8 }}
          size='large'
          status='danger'
          appearance='outline'
          onPress={() => signInGuess()}
        >
          Go as Guess
        </Button>
        <Layout
          style={{
            borderWidth: 0.6,
            width: '85%',
            height: 49.5,
            marginVertical: 8,
            paddingVertical: 14,
            paddingHorizontal: 10,
            borderRadius: 6,
            borderColor: '#8f9bb3',
          }}
        >
          <Layout
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text> No account yet? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text status='danger' category='s1'>
                Sign up
              </Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
