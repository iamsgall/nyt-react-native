import { useStripe } from '@stripe/stripe-react-native'
import { Button } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Cart } from '../icons/evaIcons'
import { API_URL } from '@env' // http://localhost:3000

export default function CheckoutButton() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { paymentIntent, ephemeralKey, customer } = await response.json()

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: false,
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert('Success', 'Your order is confirmed!')
    }
  }

  useEffect(() => {
    initializePaymentSheet()
    return () => setLoading(false)
  }, [])

  return (
    <Button
      appearance='filled'
      status='danger'
      accessoryLeft={<Cart />}
      onPress={openPaymentSheet}
      disabled={!loading}
    >
      Buy Book
    </Button>
  )
}

const styles = StyleSheet.create({})
