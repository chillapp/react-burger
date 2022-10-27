// index
import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./orders";
import {authReducer} from "./auth";
import {feedReducer} from "./feed";

export const rootReducer = {
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    orders: orderReducer,
    auth: authReducer,
    feed: feedReducer,
}
