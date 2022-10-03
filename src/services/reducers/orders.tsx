import {createReducer, current} from "@reduxjs/toolkit";
import {orderFail, orderRequest, orderSuccess} from "../actions/orders";
import {IOrders} from "../store";

const initialState: IOrders = {
    error: null,
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
        .addCase(orderSuccess, (state, { payload: orderDetail }) => {
            const currentState = current(state);
            return {
                ...currentState,
                loading: false,
                success: true,
                order: orderDetail
            }
        })
        .addCase(orderFail, (state, { payload: error }) => {
            const currentState = current(state);
            return {
                ...currentState,
                error: error,
                loading: false,
                success: false,
                order: null
            }
        })
})
