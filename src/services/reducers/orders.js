import {createReducer, current} from "@reduxjs/toolkit";
import {OrderFail, OrderRequest, OrderSuccess} from "../actions/orders";

const initialState = {
    order: null,
    loading: false,
    success: false
};

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(OrderRequest, (state, { payload}) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: true,
                success: false,
                order: null
            }
        })
        .addCase(OrderSuccess, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: false,
                success: true,
                order: payload
            }
        })
        .addCase(OrderFail, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: false,
                success: false,
                order: null
            }
        })
})
