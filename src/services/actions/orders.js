import {createAction} from "@reduxjs/toolkit";
import {getApiUrl} from "../../components/app/app";
import {checkResponse, checkSuccess} from "../http";

export const OrderRequest = createAction('ORDER/REQUEST');
export const OrderSuccess = createAction('ORDER/SUCCESS');
export const OrderFail = createAction('ORDER/FAIL');

export function createOrder(ids) {
    return function (dispatch) {
        dispatch(OrderRequest());
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
            .then(payload => dispatch(OrderSuccess({ name: payload.name, ...payload.order })))
            .catch(error => dispatch(OrderFail(error)));
    }
}
