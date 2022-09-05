import { createAction } from '@reduxjs/toolkit'
import {checkResponse, checkSuccess} from "../http";
import {getApiUrl} from "../../components/app/app";

export const ingredientsFail = createAction('INGREDIENTS/FAIL')
export const ingredientsRequest = createAction('INGREDIENTS/REQUEST')
export const ingredientsSuccess = createAction('INGREDIENTS/SUCCESS')
export const ingredientsSetTab = createAction('INGREDIENTS/SET_TAB')
export const ingredientsShowDetail = createAction('INGREDIENTS/SHOW_DETAIL')

export function getIngredients() {
    return function (dispatch) {
        dispatch(ingredientsRequest());
        fetch(getApiUrl('ingredients'))
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(ingredientsSuccess(payload.data)))
            .catch(error => dispatch(ingredientsFail(error)));
    }
}
