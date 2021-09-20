import {combineReducers,createStore,applyMiddleware} from "redux";
import dialogsReducer from './reducers/dialogs';
import messagesReducer from './reducers/messages';
import userReducer from './reducers/user'

import thunkMiddleware from 'redux-thunk';


let rootReducers = combineReducers({
    dialogs: dialogsReducer,
    messages: messagesReducer,
    user: userReducer
})


const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

export default store;