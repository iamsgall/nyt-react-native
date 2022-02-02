import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { useReducer } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'

export default function UserState({ children }) {
  const initialState = {
    userProfile: null,
    booksFavorites: [],
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)
  const auth = getAuth()
  const db = getFirestore()

  const getUserProfile = () => {
    onAuthStateChanged(auth, user => {
      dispatch({
        type: 'GET_USER_PROFILE',
        payload: user,
      })
    })
  }

  const getBooksFavorites = async () => {
    const q = query(collection(db, 'favorites'), orderBy('posBookmark', 'asc'))
    try {
      const unsub = await onSnapshot(q, snap => {
        const favorites = []
        snap.forEach(doc => {
          favorites.push({ ...doc.data(), id: doc.id })
        })
        dispatch({
          type: 'GET_BOOKS_FAVORITES',
          payload: favorites,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  const addBookToFavorites = async (title, author, posBookmark) => {
    try {
      const docRef = await addDoc(collection(db, 'favorites'), {
        title,
        author,
        posBookmark,
      })
      // .then(() =>
      //   dispatch({
      //     type: 'ADD_BOOK_TO_FAVORITES',
      //     payload: { title, author },
      //   })
      // )
    } catch (error) {
      console.log(error)
    }
  }
  const removeBookOfFavorites = async id => {
    try {
      await deleteDoc(doc(db, 'favorites', id)).then(() => {
        dispatch({
          type: 'REMOVE_BOOK_OF_FAVORITES',
          payload: id,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        userProfile: state.userProfile,
        booksFavorites: state.booksFavorites,
        getUserProfile,
        getBooksFavorites,
        addBookToFavorites,
        removeBookOfFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
