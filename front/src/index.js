import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {userActions} from "./redux/actions";

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import './Styles/index.scss';
import 'emoji-mart/css/emoji-mart.css';

store.dispatch(userActions.fetchUserData())



ReactDOM.render(
<Router>
    <Provider store={store}>
       <App />
    </Provider>
</Router>,


  document.getElementById('root')
);

