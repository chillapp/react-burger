// index
import {ingredientsReducer} from "./ingredients";
import {constructorReducer} from "./constructor";
import {orderReducer} from "./orders";

export const rootReducer = {
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    orders: orderReducer
}
