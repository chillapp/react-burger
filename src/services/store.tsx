import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import {IResetPasswordPayload} from "../pages/reset-password/reset-password";
import {ILoginRequest} from "../pages/login/login";
import {IIngredient} from "./actions/ingredients";
import {IFeed} from "../pages/feed/feed";

export interface IStore {
    ingredients: IIngredients
    constructor: IConstructor
    orders: IOrders
    auth: IAuth,
    feed: IFeed
}

export interface IIngredients {
    items: IIngredient[]
    loading: boolean
    success: boolean
    currentTab: string
    showDetail: boolean
}

export interface IOrders {
    loading: boolean,
    success: boolean
    error: string | null,
    order: { name: string, number: number} | null,
}

export interface IConstructor {
    items: IIngredient[]
    totalPrice: number
}

export interface IAuth {
    user: IUser | null
    forgotPassword: IResponseState & { email: string | null }
    registerUser: IResponseState
    resetPassword: IResponseState & { payload: IResetPasswordPayload | null }
    loginUser: IResponseState & { data: ILoginRequest | null}
    authUser: IResponseState & { isLoaded: boolean }
    updateUser: IResponseState
    logoutUser: IResponseState
}

export interface IUser {
    name: string
    email: string
    password?: string
}

export interface IResponseState {
    success: boolean
    request: boolean
    error: string | null
}

const preloadedState: IStore = {
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
    orders: {
        error: null,
        order: null,
        loading: false,
        success: false
    },
    auth: {
        user: null,
        forgotPassword: {
            email: null,
            success: false,
            request: false,
            error: null
        },
        registerUser: {
            success: false,
            request: false,
            error: null
        },
        resetPassword: {
            payload: null,
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
            error: null,
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
            error: null,
        }
    },
    feed: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0
    }
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: [ thunk ],
    preloadedState: preloadedState
})
