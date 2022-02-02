import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components'
import { ThemeStyle } from '../shared/ThemeStyle'
import { AlertIcon } from '../icons/evaIcons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { globalStyles } from '../styles/globalStyles'
import { signUpForm } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

export default function SignUpScreen() {
  const themeStyle = ThemeStyle()
  const navigation = useNavigation()
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const auth = getAuth()

  const SignUpSchema = yup
    .object({
      name: yup.string().required().min(4),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    })
    .required()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(SignUpSchema),
  })

  const onSubmit = data => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(cred => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
        })
      })
      .then(() => {
        navigation.navigate('RootDrawer')
        reset()
      })
      .catch(err => console.log(err.code, err.message))
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        fill='#8f9bb3'
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  )

  const renderCaption = () => (
    <View style={styles.captionContainer}>
      {AlertIcon(styles.captionIcon)}
      <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
    </View>
  )

  return (
    <SafeAreaView style={{ backgroundColor: themeStyle, flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <Layout style={{ alignItems: 'center' }}>
          <Text
            category='h1'
            style={{
              fontSize: 44,
              marginTop: 66,
              width: '85%',
            }}
          >
            Create{' '}
          </Text>
          <Text
            style={{
              fontSize: 44,
              marginBottom: 66,
              width: '85%',
            }}
          >
            new account
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{ width: '85%', marginVertical: 20 }}
                label='Full name'
                placeholder='Enter your name'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name='name'
          />
          <Text style={globalStyles.errorText}>{errors.name?.message}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{
                  width: '85%',
                  marginVertical: 20,
                }}
                label='Email address'
                placeholder='name@example.com'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize='none'
              />
            )}
            name='email'
          />
          <Text style={globalStyles.errorText}>{errors.email?.message}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{ width: '85%', marginVertical: 20 }}
                label='Create Password'
                placeholder='Enter your password'
                caption={renderCaption}
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name='password'
          />
          <Text style={globalStyles.errorText}>{errors.password?.message}</Text>
        </Layout>

        <Layout style={{ alignItems: 'center', bottom: '-10%' }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            size='large'
            status='danger'
            style={{ width: '85%' }}
          >
            Sign Up!
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    color: '#8F9BB3',
    marginTop: 6,
  },
})
