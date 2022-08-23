import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import {rootReducer} from "./services/reducers";
import thunk from "redux-thunk";

const preloadedState = {
    ingredients: {
        items: [],
        loading: false,
        success: false,
        currentTab: 'one',
        showDetail: false,
    },
    constructor: {
        items: [],
        totalPrice: 0
    }
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [ thunk ],
    preloadedState: preloadedState
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
