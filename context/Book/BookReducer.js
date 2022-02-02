import { GET_LIST_BOOKS, GET_LIST_CATEGORIES } from '../types'

export default (state, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_LIST_CATEGORIES:
      return {
        ...state,
        listCategories: payload,
      }
    case GET_LIST_BOOKS:
      return {
        ...state,
        listBooks: payload,
      }
    default:
      return state
  }
}
