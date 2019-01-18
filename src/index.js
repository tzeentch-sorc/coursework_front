import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
//import Similar from './components/Similar/Similar'
import { composeWithDevTools } from 'redux-devtools-extension';

// import ReduxStateChangeListener from 'redux-state-change-listener'

import './index.css'
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";

//const ReduxStateChangeListener = require('redux-state-change-listener');

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
            currentLot: {
                id: 1,
                name: 'hello1',
                author: 'Ван Гог, Винсент',
                genre: 'a',
                expDate: date,
                seller: 'King Arthur',
                bet: 1000,
                description: desc,
                certificate: ''
            }
        },
        lotListReducer:{
            items: [
                {
                    id: 1,
                    name: 'hello1',
                    author: 'Ван Гог, Винсент',
                    genre: 'a',
                    technique: 'a',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: ''
                },
                {
                    id: 2,
                    name: 'hello2',
                    author: 'Ван Гог, Винсент',
                    genre: 'b',
                    technique: 'a',
                    expDate: date,
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 3,
                    name: 'hello3',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'a',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 4,
                    name: 'hello4',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'c',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 5,
                    name: 'hello5',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'a',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 6,
                    name: 'hello6',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'c',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 7,
                    name: 'hello12',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'b',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 8,
                    name: 'hello22',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'a',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 9,
                    name: 'hello32',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'c',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 10,
                    name: 'hello42',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'b',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 11,
                    name: 'hello52',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'b',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                },
                {
                    id: 12,
                    name: 'hello62',
                    author: 'Ван Гог, Винсент',
                    expDate: date,
                    genre: 'a',
                    technique: 'a',
                    seller: 'King Arthur',
                    bet: 1000,
                    description: desc,
                    certificate: 123456
                }
            ]
        },
        userListReducer: {
            users: [
                {
                    id: 3,
                    name: 'John3',
                    surname: 'Cena3',
                    email: '3qwe@qwe.ru'
                },{
                    id: 0,
                    name: 'John0',
                    surname: 'Cena0',
                    email: '0qwe@qwe.ru'
                },{
                    id: 1,
                    name: 'John1',
                    surname: 'Cena1',
                    email: '1qwe@qwe.ru'
                },{
                    id: 4,
                    name: 'John4',
                    surname: 'Cena4',
                    email: '1qwe@qwe.ru'
                },
                {
                    id: 2,
                    name: 'John2',
                    surname: 'Cena2',
                    email: '2qwe@qwe.ru'
                }
            ],
            banned:[
                {
                    id: 666,
                    name: 'Satan',
                    surname: '(Lucifer)',
                    email: '666@hell.com'
                },
            ]
        }
    },
    composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
));

// const onCurLotChanged = (currentLot, state) => {
//     Similar.upd(state.lotListReducer.items, currentLot);
// };
// const stateCallbackManager = new ReduxStateChangeListener(store);
// stateCallbackManager.register(state => state.currentLotReducer.currentLot, onCurLotChanged);
// stateCallbackManager.start();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
