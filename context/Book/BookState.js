import BookContext from './BookContext'
import BookReducer from './BookReducer'
import axios from 'axios'
import { useReducer } from 'react'
import { API_KEY, SECRET } from '@env'

export default function BookState({ children }) {
  const initialState = {
    listCategories: [],
    listBooks: [],
    listBooksFavorites: [],
  }

  // https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=P1NMImsqflT4htCImU9oQ2txWtYA5dBh

  const [state, dispatch] = useReducer(BookReducer, initialState)

  const URI = 'https://api.nytimes.com/svc/books/v3'
  const URI_WITHOUT_NETWORK = 'http://localhost:4000' // npm run json-server

  // TODO: ALL LISTS
  // https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=yourkey

  // TODO: SPECIFIC LIST
  //   https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey

  const getListCategories = async () => {
    // const res = await axios.get(
    //   `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`
    // )
    const res = await axios.get(`${URI_WITHOUT_NETWORK}/book-category`)
    dispatch({
      type: 'GET_LIST_CATEGORIES',
      payload: res.data.results,
    })
  }
  const getListBooks = async list_name_encoded => {
    // const res = await axios.get(
    //   `https://api.nytimes.com/svc/books/v3/lists/current/${list_name_encoded}.json?api-key=${API_KEY}`
    // )
    const res = await axios.get(`${URI_WITHOUT_NETWORK}/book-education`)

    dispatch({
      type: 'GET_LIST_BOOKS',
      payload: res.data.results.books,
    })
  }

  return (
    <BookContext.Provider
      value={{
        listCategories: state.listCategories,
        listBooks: state.listBooks,
        getListCategories,
        getListBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
