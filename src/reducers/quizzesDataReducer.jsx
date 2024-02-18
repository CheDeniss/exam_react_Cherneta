const quizzesDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUIZ_RESULTS':
            const userIndex = state.findIndex(user => user.id === action.payload.id);

            if (userIndex !== -1) {
                return [
                    ...state.slice(0, userIndex),
                    {
                        ...state[userIndex],
                        quizResults: [...state[userIndex].quizResults, action.payload.result]
                    },
                    ...state.slice(userIndex + 1)
                ];
            } else {
                return [
                    ...state,
                    {
                        id: action.payload.id,
                        quizResults: [action.payload.result]
                    }
                ];
            }
        default:
            return state;
    }
}

export default quizzesDataReducer;
