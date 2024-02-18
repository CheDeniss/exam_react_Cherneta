

const initialState = []


const registeredUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            console.log('SET_USER_DATA', action);
            return [...state, action.payload]
        case 'CHANGE_USER_DATA':
            return state.map(user => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        login: action.payload.newLogin,
                        birthday: action.payload.newBirthday
                    }
                }
                return user
            })
        default:
            return state;
    }
}

export default registeredUsersReducer;