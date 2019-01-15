import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './reducers/login'
import './index.css'
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";

const date = new Date().toDateString();

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const desc ='Artifex аrmifer digitis dextris oculis occultis!Oh great Machine God, we beseech thee to deliver us from danger\n' +
    '                            Oh great Machine God, we beseech thee to bring life into the inanimate\n' +
    '                            Oh great Machine God, we beseech thee to invest this metal carcass with your spirit\n' +
    '                            Oh great Machine God, we beseech thee to bring forth the holy en-djinnMay your weapon be guarded against malfunction.\n' +
    '                            As your soul is guarded from impurity.\n' +
    '                            The Machine God watches over you.\n' +
    '                            Unleash the weapons of war.\n' +
    '                            Unleash the Deathdealer.Toll the Great Bell once!\n' +
    '                            Pull the Lever forward to engage the\n' +
    '                            Piston and Pump…';

const store = createStore(rootReducer,
    {
        loginReducer: {
            isAuthorised: true
        },
        currentLotReducer:{
            currentLot: 1
        },
        lotListReducer:{
            items: [
                {
                    id: 1,
                    name: 'hello1',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 2,
                    name: 'hello2',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 3,
                    name: 'hello3',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 4,
                    name: 'hello4',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 5,
                    name: 'hello5',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 6,
                    name: 'hello6',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 1,
                    name: 'hello1',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 2,
                    name: 'hello2',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 3,
                    name: 'hello3',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 4,
                    name: 'hello4',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 5,
                    name: 'hello5',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                },
                {
                    id: 6,
                    name: 'hello6',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc
                }
            ]
        }
    },
    composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
