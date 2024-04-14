import {TIngredient} from "../types/ingredients";
import {TConstructorActions} from "../actions/constructor";
import { v4 as uuidV4} from "uuid"

export type TConstructorState = {
    cart: TIngredient[]
    totalPrice: number
}

export const constructorInitialState: TConstructorState = {
    cart: [],
    totalPrice: 0
}

export const constructorReducer = (state = constructorInitialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case "CONSTRUCTOR_ADD":{
            const newCart = [...state.cart];
            if (action.ingredient.type === 'bun') {
                const bunIndex = newCart.findIndex(ingredient => ingredient.type === 'bun');
                if (bunIndex >= 0) {
                    newCart.splice(bunIndex, 1);
                }
            }
            newCart.push({ ...action.ingredient });
            return {
                ...state,
                cart: newCart.map((item) => ({ ...item, uuid: uuidV4() })),
                totalPrice: newCart.reduce((total, item) => total + item.price, 0)
            };
        }
        case "CONSTRUCTOR_DEL": {
            const newCart = [...state.cart];
            const deleteItemIndex = newCart.findIndex(item => item.uuid === action.ingredient.uuid);
            newCart.splice(deleteItemIndex, 1);
            return {
                ...state,
                cart: [ ...newCart ],
                totalPrice: newCart.reduce((total, item) => total + item.price, 0)
            };
        }
        case "CONSTRUCTOR_REPLACE": {
            const { dragIngredient, dropIngredient } = action.data;
            let newCart = [ ...state.cart ]
            const dragIndex = state.cart.findIndex(ingredient => ingredient.uuid === dragIngredient.uuid);
            newCart.splice(dragIndex, 1);
            const dropIndex = state.cart.findIndex(ingredient => ingredient.uuid === dropIngredient.uuid);
            newCart.splice(dropIndex, 0, dragIngredient);
            return {
                ...state,
                cart: [ ...newCart ]
            };
        }
        case "CONSTRUCTOR_RESET": {
            return {
                ...state,
                cart: [],
                totalPrice: 0,
            }
        }
        default: {
            return state;
        }
    }
};

