import React, { useContext, useEffect } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native'
import {
  Button,
  Card,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components'
import { globalStyles } from '../styles/globalStyles'
import { BackgroundStyle, ThemeStyle } from '../shared/ThemeStyle'
import BookContext from '../context/Book/BookContext'

export default function HomeScreen({ navigation }) {
  const themeStyle = ThemeStyle()
  const backgroundStyle = BackgroundStyle()
  const { listCategories, getListCategories } = useContext(BookContext)

  useEffect(() => {
    getListCategories()
  }, [])

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate('ListBooksTabs', {
          list_name: item.list_name,
          list_name_encoded: item.list_name_encoded,
        })
      }
    >
      <Text status='danger' category='s2' style={{ paddingVertical: 12 }}>
        {item.list_name}
      </Text>
    </Card>
  )

  return (
    <SafeAreaView style={{ backgroundColor: themeStyle, flex: 1 }}>
      <Layout>
        <Text
          category='h4'
          style={{
            backgroundColor: backgroundStyle,
            textAlign: 'center',
            paddingTop: 22,
            paddingBottom: 6,
          }}
        >
          Books Category
        </Text>

        <List
          keyExtractor={item => item.list_name_encoded}
          contentContainerStyle={styles.contentContainer}
          data={listCategories}
          renderItem={renderItem}
          numColumns={2}
        />
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 2,
  },
})
