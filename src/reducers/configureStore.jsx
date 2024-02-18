import {applyMiddleware, createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./rootReducer.jsx";
import { thunk as thunk} from 'redux-thunk';

const persistConfig = {
    key: 'QuizApp',
    storage,
    //blacklist: ['authorizedUserReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
