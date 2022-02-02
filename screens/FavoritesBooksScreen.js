import { SafeAreaView, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import {
  Layout,
  Button,
  Icon,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components'
import { ThemeStyle } from '../shared/ThemeStyle'
import { MinIcon } from '../icons/evaIcons'
import UserContext from '../context/User/UserContext'

export default function FavoritesBooksScreen() {
  const themeStyle = ThemeStyle()
  const { getBooksFavorites, booksFavorites, removeBookOfFavorites } =
    useContext(UserContext)

  useEffect(() => {
    getBooksFavorites()
  }, [])

  const renderItemAccessory = index => (
    <Button
      size='tiny'
      appearance='filled'
      status='danger'
      accessoryLeft={<MinIcon />}
      onPress={() => removeBookOfFavorites(booksFavorites[index].id)}
    ></Button>
  )

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.author}`}
      accessoryRight={renderItemAccessory(index)}
    />
  )

  return (
    <SafeAreaView style={{ backgroundColor: themeStyle, flex: 1 }}>
      {booksFavorites.length > 0 ? (
        <Layout>
          <List data={booksFavorites} renderItem={renderItem} />
        </Layout>
      ) : (
        <Layout
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Text status='danger' category={'s1'}>
            No book favorites yet :'(
          </Text>
        </Layout>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
