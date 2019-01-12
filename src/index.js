import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './reducers/login'

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});


const store = createStore(loginReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
));

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>,
    document.getElementById('root'));
