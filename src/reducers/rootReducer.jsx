import {combineReducers} from "redux";
import registeredUsersReducer from "./registeredUsersReducer.jsx";
import quizzesDataReducer from "./quizzesDataReducer.jsx";
import quizQuestionsReducer from "./quizQuestionsReducer.jsx";
import thematicReducer from "./thematicReducer.jsx";
import authorizedUserReducer from "./authorizedUserReducer.jsx";


const rootReducer = combineReducers({
    registeredUsersReducer,
    quizzesDataReducer,
    quizQuestionsReducer,
    thematicReducer,
    authorizedUserReducer
});

export default rootReducer;