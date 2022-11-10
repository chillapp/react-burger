import {rootReducer} from "./reducers";
import thunk from 'redux-thunk';
import {socketMiddleware} from "./middleware/socketMiddleware";
import {configureStore} from "@reduxjs/toolkit";

/*export const store = configureStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(socketMiddleware())
    )
);*/

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk, socketMiddleware())
});
