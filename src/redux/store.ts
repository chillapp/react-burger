import {rootReducer} from "./reducers";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import {socketMiddleware} from "./middleware/socketMiddleware";

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(socketMiddleware())
    )
);
