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
    },
    auth: {
        user: null,
        accessToken: null,
        refreshToken: null,
        forgotPassword: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        registerUser: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        resetPassword: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        loginUser: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        authUser: {
            success: false,
            request: false,
            isLoaded: false,
        },
        updateUser: {
            success: false,
            request: false,
            error: null,
        },
        logoutUser: {
            request: false,
            success: false,
        }
    }
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: [ thunk ],
    preloadedState: preloadedState
})
