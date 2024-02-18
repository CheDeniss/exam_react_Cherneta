const initialState = {
  questions: [],
  response_status: null,
  error: null,
};

const quizQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_QUIZ_QUESTIONS':
      console.log('FETCH_QUIZ_QUESTIONS', action.payload);
      return {
        ...state,
        questions: action.payload.results,
        response_status: action.payload.response_code,
        error: null
      };
    case 'FETCH_QUIZ_QUESTIONS_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CLEAR_QUIZ_QUESTIONS':
      console.log('CLEAR_QUIZ_QUESTIONS - редуктор');
      return initialState
    default:
      return state;
  }
};

export default quizQuestionsReducer;