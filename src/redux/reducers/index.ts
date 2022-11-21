import {ingredientsReducer} from "./ingredients";
import {combineReducers} from "redux";
import {constructorReducer} from "./constructor";
import {userReducer} from "./user";
import {socketReducer} from "./socket";
import {feedReducer} from "./feed";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    user: userReducer,
    socket: socketReducer,
    feed: feedReducer
})
