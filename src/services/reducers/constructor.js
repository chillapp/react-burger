import {createReducer, current} from "@reduxjs/toolkit";
import {ConstructorAdd, ConstructorDel, ConstructorReset, ConstructorReplace} from "../actions/constructor";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    items: [],
    totalPrice: 0
};

export const constructorReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ConstructorAdd, (state, { payload}) => {
            const currentState = current(state);
            const newCart = [...currentState.items];
            if (payload.type === 'bun') {
                const bunIndex = newCart.findIndex(cartItem => cartItem.type === 'bun');
                if (bunIndex >= 0) newCart.splice(bunIndex, 1);
            }
            newCart.push(Object.assign({}, payload));
            return {
                ...currentState,
                items: newCart.map((item, index) => ({ ...item, lineno: ++index, uuid: uuidv4() })),
                totalPrice: newCart.reduce((total, item) => total + item.price, 0)
            };
        })
        .addCase(ConstructorDel, (state, { payload }) => {
            const currentState = current(state);
            const newCart = [...currentState.items];
            const deleteItemIndex = newCart.findIndex(item => item.lineno === payload.lineno);
            newCart.splice(deleteItemIndex, 1);
            return {
                ...currentState,
                items: newCart.map((item, index) => ({ ...item, lineno: ++index })),
                totalPrice: newCart.reduce((total, item) => total + item.price, 0)
            };
        })
        .addCase(ConstructorReset, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                items: [],
                totalPrice: 0
            };
        })
        .addCase(ConstructorReplace, (state,{ payload }) => {
            const { dragItem, dropItem } = payload;
            const currentState = current(state);
            let newCart = [...currentState.items]
            const dragIndex = currentState.items.findIndex(item => item.uuid === dragItem.uuid);
            newCart.splice(dragIndex, 1);
            const dropIndex = currentState.items.findIndex(item => item.uuid === dropItem.uuid);
            newCart.splice(dropIndex, 0, dragItem);
            return {
                ...currentState,
                items: [...newCart]
            };
        })
})
