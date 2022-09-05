import {createAction} from "@reduxjs/toolkit";
import {getApiUrl} from "../../components/app/app";
import {checkResponse, checkSuccess} from "../http";

export const orderRequest = createAction('ORDER/REQUEST');
export const orderSuccess = createAction('ORDER/SUCCESS');
export const orderFail = createAction('ORDER/FAIL');

export function createOrder(ids) {
    return function (dispatch) {
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
