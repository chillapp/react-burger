import {createReducer, current} from '@reduxjs/toolkit'
import {
    ingredientsRequest,
    ingredientsSuccess,
    ingredientsFail,
    ingredientsSetTab,
    ingredientsShowDetail, IIngredient
} from "../actions/ingredients";

const initialState = {
    items: [] as IIngredient[],
    loading: false,
    success: false,
    currentTab: 'one',
    showDetail: false,
};

export const ingredientsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ingredientsRequest, (state) => {
            const currentState = current(state);
            return { ...currentState, items: [], loading: true, success: false };
        })
        .addCase(ingredientsSuccess, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, items: payload, loading: false, success: true };
        })
        .addCase(ingredientsFail, (state) => {
            const currentState = current(state);
            return { ...currentState, items: [], loading: false, success: false };
        })
        .addCase(ingredientsSetTab, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, currentTab: payload };
        })
        .addCase(ingredientsShowDetail, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, showDetail: payload };
        })
})
