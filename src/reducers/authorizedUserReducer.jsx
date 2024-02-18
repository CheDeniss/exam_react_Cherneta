

const initialState = null

const authorizedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_IN':
      return {id: action.payload.id, login: action.payload.login}
    case 'USER_OUT':
      return null
    default:
      return state
  }
}

export default authorizedUserReducer
