import {createReducer, current} from "@reduxjs/toolkit";
import {orderFail, orderRequest, orderSuccess} from "../actions/orders";

const initialState = {
    order: null,
    loading: false,
    success: false
};

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(orderRequest, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: true,
                success: false,
                order: null
            }
        })
        .addCase(orderSuccess, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: false,
                success: true,
                order: payload
            }
        })
        .addCase(orderFail, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: false,
                success: false,
                order: null
            }
        })
})
