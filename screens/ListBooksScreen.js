import { Button, Card, Layout, List, Text } from '@ui-kitten/components'
import React, { useContext, useEffect, useState } from 'react'
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ThemeStyle } from '../shared/ThemeStyle'
import BookContext from '../context/Book/BookContext'
import { Bookmark, BookmarkOutline, Cart } from '../icons/evaIcons'
import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import CheckoutButton from '../components/CheckoutButton'
import UserContext from '../context/User/UserContext'

export default function ListBooksScreen({ route, navigation }) {
  const themeStyle = ThemeStyle()
  const { list_name, list_name_encoded } = route.params
  const { listBooks, getListBooks } = useContext(BookContext)
  const {
    addBookToFavorites,
    booksFavorites,
    getBooksFavorites,
    removeBookOfFavorites,
  } = useContext(UserContext)

  useEffect(() => {
    getListBooks(list_name_encoded)
    getBooksFavorites()
  }, [])

  const bookArray = new Array(listBooks.length)
  bookArray.fill(null)

  // console.log(bookArray)

  for (let i = 0; i < booksFavorites.length; i++) {
    bookArray[booksFavorites[i].posBookmark] =
      listBooks[booksFavorites[i].posBookmark].title
  }

  // console.log(bookArray)

  const Header = (props, item) => (
    <Layout>
      <ImageBackground
        source={{
          uri: item.book_image,
        }}
        resizeMode='stretch'
        style={{
          flex: 1,
          width: '100%',
          height: item.book_image_height,
          alignItems: 'flex-end',
        }}
      >
        <Layout
          style={{
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8,
          }}
        >
          <CheckoutButton />
        </Layout>
      </ImageBackground>
    </Layout>
  )

  const Footer = (props, item) => (
    <Layout {...props}>
      <Text category='s1' style={{ textAlign: 'center', marginVertical: 8 }}>
        Where do I find it?
      </Text>
      <Layout style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Layout level='3' style={styles.layoutLogo}>
          <Ionicons
            name='logo-amazon'
            size={20}
            color='#e47911'
            onPress={() => WebBrowser.openBrowserAsync(item.buy_links[0].url)}
          />
        </Layout>
        <Layout level='3' style={styles.layoutLogo}>
          <Ionicons
            name='logo-apple'
            size={20}
            color='#A2AAAD'
            onPress={() => WebBrowser.openBrowserAsync(item.buy_links[1].url)}
          />
        </Layout>
        <Layout level='3' style={styles.layoutLogo}>
          <Ionicons
            name='book'
            size={20}
            color='#ff708d'
            onPress={() => WebBrowser.openBrowserAsync(item.buy_links[2].url)}
          />
        </Layout>
      </Layout>
    </Layout>
  )

  const renderItem = ({ item, index }) => (
    <Card
      style={styles.card}
      header={props => Header(props, item)}
      footer={props => Footer(props, item)}
    >
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {item.rank}. {item.title}
        </Text>

        {booksFavorites.length > 0 && bookArray[index] === item.title ? (
          <TouchableOpacity
            onPress={() => removeBookOfFavorites(booksFavorites[index].id)}
          >
            <Bookmark />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              addBookToFavorites(item.title, item.author, item.rank - 1)
            }
          >
            <BookmarkOutline />
          </TouchableOpacity>
        )}
      </Layout>
      <Layout style={{ justifyContent: 'flex-start' }}>
        <Text category='p2' status='info'>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 20,
              fontWeight: 'bold',
              opacity: 0,
            }}
          >
            {item.rank}.
          </Text>
          {'  '}
          {item.author}
        </Text>
      </Layout>
      <Text style={{ fontSize: 17, marginVertical: 12, letterSpacing: 0.8 }}>
        {item.description}
      </Text>
      <Layout style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <Text>
          <Text category='s1'>ISBN</Text> {item.primary_isbn13}
        </Text>
      </Layout>
      <Layout style={{ alignItems: 'flex-end', marginTop: 8 }}>
        <Text category='s2'>Publisher</Text>
      </Layout>

      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Text category='c1'>
          Weeks on list <Text category='c2'>{item.weeks_on_list}</Text>
        </Text>
        <Text category='c2'>{item.publisher}</Text>
      </Layout>
      <Text
        status='danger'
        category='s1'
        style={{ textAlign: 'right', marginTop: 16 }}
      >
        ${item.price} USD
      </Text>
    </Card>
  )

  return (
    <SafeAreaView style={{ backgroundColor: themeStyle, flex: 1 }}>
      <Layout style={styles.layout}>
        <List
          keyExtractor={item => item.primary_isbn13}
          contentContainerStyle={styles.contentContainer}
          data={listBooks}
          renderItem={renderItem}
        />
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  layoutLogo: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  card: {
    margin: 8,
  },
})
