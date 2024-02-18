import  actionTypes  from './ActionTypes.jsx';
import axios from "axios";

//USER ACTIONS

export const changeUserData = (id, newLogin, newBirthday) => ({
    type: actionTypes.CHANGE_USER_DATA,
    payload: {
        id,
        newLogin,
        newBirthday
    }
})

export const newUser = (id, login, password, birthday) => ({
    type: actionTypes.SET_USER_DATA,
    payload: {
        id,
        login,
        password,
        birthday
    }
})

//QUIZ DATA ACTIONS

export const setQuizResults = (id, result) => ({
    type: actionTypes.SET_QUIZ_RESULTS,
    payload: {
        id,
        result
    }
})

//QUIZ QUESTIONS ACTIONS

export const fetchQuizQuestions = (params) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.CLEAR_QUIZ_QUESTIONS });
        return axios.get('http://localhost:3001/getQuestions', { params })
            .then(response => {
                console.log('response -> ', response.data);
                dispatch({ type: actionTypes.FETCH_QUIZ_QUESTIONS, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: actionTypes.FETCH_QUIZ_QUESTIONS_ERROR, error: error.message });
                console.error('Error fetching quiz questions:', error);
                throw error;
            });
    };
};


export const clearQuizQuestions = () => {
    return { type: actionTypes.CLEAR_QUIZ_QUESTIONS }
}


//THEMATICS ACTIONS

export const fetchThematics = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CLEAR_THEMATICS });
        try {
            const response = await axios.get('http://localhost:3001/getThematics');
            console.log('response -> ', response.data);
            dispatch({ type: actionTypes.GET_THEMATIC, payload: response.data });
        } catch (error) {
            dispatch({ type: actionTypes.GET_THEMATIC_ERROR, error: error.message });
            console.error('Error fetching thematics:', error);
            throw error;
        }
    };
};

export const setUserChoice = (difficulty, theme, themeId) => {
    return {
        type: actionTypes.SET_USER_CHOICE,
        payload: {
            difficulty,
            theme,
            themeId
        }
    }
}

export const clearThematic = () => {
    return { type: actionTypes.CLEAR_THEMATICS }
}

//AUTHORIZATION ACTIONS

export const setAuth = (id, login) => ({
    type: actionTypes.USER_IN,
    payload: {
        id,
        login
    }
})

export const logOut = () => ({
    type: actionTypes.USER_OUT
})