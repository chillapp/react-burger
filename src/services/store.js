import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

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

export const store = configureStore({
    reducer: rootReducer,
    middleware: [ thunk ],
    preloadedState: preloadedState
})
