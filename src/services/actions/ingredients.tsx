import { createAction } from '@reduxjs/toolkit'
import {checkResponse, checkSuccess, getApiUrl} from "../http";

export interface IIngredient {
    _id: string
    name: string
    proteins: number
    fat: number
    carbohydrates: number
    type: "bun" | "main" | "sauce"
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v:number
    lineno?: number
    uuid?: string
}

export const ingredientsFail = createAction<string>('INGREDIENTS/FAIL')
export const ingredientsRequest = createAction('INGREDIENTS/REQUEST')
export const ingredientsSuccess = createAction<IIngredient[]>('INGREDIENTS/SUCCESS')
export const ingredientsSetTab = createAction<string>('INGREDIENTS/SET_TAB')
export const ingredientsShowDetail = createAction<boolean>('INGREDIENTS/SHOW_DETAIL')

export function getIngredients(): unknown {
    return function (dispatch: Function) {
        dispatch(ingredientsRequest());
        fetch(getApiUrl('ingredients'))
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(ingredientsSuccess(payload.data)))
            .catch(error => dispatch(ingredientsFail(error)));
    }
}
