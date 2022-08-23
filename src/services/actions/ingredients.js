import { createAction } from '@reduxjs/toolkit'
import {checkResponse, checkSuccess} from "../http";
import {getApiUrl} from "../../components/app/app";

export const IngredientsFail = createAction('INGREDIENTS/FAIL')
export const IngredientsRequest = createAction('INGREDIENTS/REQUEST')
export const IngredientsSuccess = createAction('INGREDIENTS/SUCCESS')
export const IngredientsSetTab = createAction('INGREDIENTS/SET_TAB')
export const IngredientsShowDetail = createAction('INGREDIENTS/SHOW_DETAIL')

export function getIngredients() {
    return function (dispatch) {
        dispatch(IngredientsRequest());
        fetch(getApiUrl('ingredients'))
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(IngredientsSuccess(payload.data)))
            .catch(error => dispatch(IngredientsFail(error)));
    }
}
