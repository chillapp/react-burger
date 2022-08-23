import {createReducer, current} from '@reduxjs/toolkit'
import {
    IngredientsRequest,
    IngredientsSuccess,
    IngredientsFail,
    IngredientsSetTab,
    IngredientsShowDetail
} from "../actions/ingredients";

const initialState = {
    items: [],
    loading: false,
    success: false,
    currentTab: 'one',
    showDetail: false,
};

export const ingredientsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(IngredientsRequest, (state) => {
            const currentState = current(state);
            return { ...currentState, items: [], loading: true, success: false };
        })
        .addCase(IngredientsSuccess, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, items: payload, loading: false, success: true };
        })
        .addCase(IngredientsFail, (state) => {
            const currentState = current(state);
            return { ...currentState, items: [], loading: false, success: false };
        })
        .addCase(IngredientsSetTab, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, currentTab: payload };
        })
        .addCase(IngredientsShowDetail, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, showDetail: payload };
        })
})
