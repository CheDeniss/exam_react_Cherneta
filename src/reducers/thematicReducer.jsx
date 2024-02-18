const initialState = {
  thematic: [],
    error: null,
    userChoice: null,
};

const thematicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_THEMATIC':
      return {
        ...state,
        thematic: action.payload,
      };
    case 'CLEAR_THEMATICS':
        return initialState;
    case 'GET_THEMATIC_ERROR':
        return {
            ...state,
            error: action.error,
        };
    case 'SET_USER_CHOICE':
      return {
        ...state,
        userChoice: action.payload,
      };
    default:
      return state;
    }}

export default thematicReducer;