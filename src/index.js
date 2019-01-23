import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css'
import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
//import Similar from './components/Similar/Similar'
// import ReduxStateChangeListener from 'redux-state-change-listener';


//const ReduxStateChangeListener = require('redux-state-change-listener');
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const composeEnhancers = composeWithDevTools({});

const date = new Date().toDateString();
const desc ='Одна из наиболее известных картин нидерландского художника-постимпрессиониста Винсента Ван Гога. Представляет вид из восточного окна спальни Ван Гога в Сен-Реми-де-Прованс на предрассветное небо и вымышленную деревню. Картина написана в июне 1889 года;';
let store = createStore(persistedReducer,
    {
        loginReducer: {
            isAuthorised: false,
            regResult: false,
            role: null
        },
        currentLotReducer:{
            currentLot: {
                id: 2,
                name: 'Omnissiah`s sign',
                author: 'Servitor#321212',
                genre: 'b',
                technique: 'a',
                expDate: date,
                seller: 'King Arthur',
                bet: 1000,
                description: desc,
                certificate: 123456
            }
        },
        lotListReducer:{
            items: [
                {
                    id: 2,
                    name: 'Omnissiah`s sign',
                    author: 'Servitor#321212',
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
                    name: 'Звёздная ночь',
                    author: 'Ван Гог, Винсент',
                    genre: 'постимпрессионизм',
                    technique: 'Холст, масло.',
                    expDate: date,
                    seller: 'Солдатов Игорь',
                    bet: 1000,
                    description: desc,
                    certificate: ''
                },
                {
                    id: 1,
                    name: 'Звёздная ночь',
                    author: 'Ван Гог, Винсент',
                    genre: 'постимпрессионизм',
                    technique: 'Холст, масло.',
                    expDate: date,
                    seller: 'Солдатов Игорь',
                    bet: 1000,
                    description: desc,
                    certificate: ''
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
    applyMiddleware(thunk)
));

let persistor = persistStore(store);
export default () => {
    return { store, persistor }
}

// const onCurLotChanged = (currentLot, state) => {
//     Similar.upd(state.lotListReducer.items, currentLot);
// };
// const stateCallbackManager = new ReduxStateChangeListener(store);
// stateCallbackManager.register(state => state.currentLotReducer.currentLot, onCurLotChanged);
// stateCallbackManager.start();
// export const axiosInstance = axios.create({
//     baseURL: 'http://localhost:10880/',
//     timeout: 2000
// });


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

export function urlPort(url) {
    return 'http://localhost:10880'+url;
}