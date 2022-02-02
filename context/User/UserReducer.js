import {
  GET_USER_PROFILE,
  GET_BOOKS_FAVORITES,
  ADD_BOOK_TO_FAVORITES,
  REMOVE_BOOK_OF_FAVORITES,
} from '../types'

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
      }
    case GET_BOOKS_FAVORITES:
      return {
        ...state,
        booksFavorites: payload,
      }
    case ADD_BOOK_TO_FAVORITES:
      return {
        ...state,
        booksFavorites: [...state.booksFavorites, payload],
      }
    case REMOVE_BOOK_OF_FAVORITES:
      return {
        ...state,
        booksFavorites: state.booksFavorites.filter(item => item !== payload),
      }

    default:
      return state
  }
}
