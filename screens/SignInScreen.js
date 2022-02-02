import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  Toggle,
} from '@ui-kitten/components'
import { ThemeStyle } from '../shared/ThemeStyle'
import { useForm, Controller } from 'react-hook-form'
import { globalStyles } from '../styles/globalStyles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
export default function SignInScreen() {
  const themeStyle = ThemeStyle()
  const navigation = useNavigation()

  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [checked, setChecked] = React.useState(false)

  const SignInSchema = yup
    .object({
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
      email: '',
      password: '',
    },
    resolver: yupResolver(SignInSchema),
  })

  const auth = getAuth()

  const onSubmit = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(cred => {
        navigation.navigate('RootDrawer')
        reset()
      })
      .catch(err => {
        console.log(err.code, err.message)
      })
  }

  const onCheckedChange = isChecked => {
    setChecked(isChecked)
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        fill='#8f9bb3'
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
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
            Welcome{' '}
          </Text>
          <Text
            style={{
              fontSize: 44,
              marginBottom: 66,
              width: '85%',
            }}
          >
            back!
          </Text>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{ width: '85%', marginVertical: 20 }}
                label='Email'
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
                label='Password'
                placeholder='Enter your password'
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
        <Layout style={{ alignItems: 'center' }}>
          <Layout
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 7,
              paddingHorizontal: 8,
              width: 352,
            }}
          >
            <Text category='s1'>Remember me</Text>

            <Toggle
              status='danger'
              checked={checked}
              onChange={onCheckedChange}
            />
          </Layout>
        </Layout>
        <Layout style={{ alignItems: 'center', bottom: '-20%' }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            size='large'
            status='danger'
            style={{ width: '85%' }}
          >
            Sign In!
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
