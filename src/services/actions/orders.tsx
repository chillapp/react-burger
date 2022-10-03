import {createAction} from "@reduxjs/toolkit";
import {checkResponse, checkSuccess, getApiUrl} from "../http";

export const orderRequest = createAction('ORDER/REQUEST');
export const orderSuccess = createAction<{ name: string, number: number} | null>('ORDER/SUCCESS');
export const orderFail = createAction<string>('ORDER/FAIL');

export function createOrder(ids: Array<string>): unknown {
    return function (dispatch: Function) {
        dispatch(orderRequest());
        const fetchParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients: ids }),
        };
        fetch(getApiUrl('orders'), fetchParams)
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(orderSuccess({ name: payload.name, ...payload.order })))
            .catch(error => dispatch(orderFail(error)));
    }
}
