import { LogBox } from 'react-native'
import { initializeApp } from 'firebase/app'
import {
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} from '@env'

initializeApp({
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
})

// Ignore all log notifications:
LogBox.ignoreAllLogs()
