import {TIngredient} from "../types/ingredients";
import {TIngredientsActions} from "../actions/ingredients";

export type TIngredientsState = {
    ingredientsTab: string
    ingredientsShowDetails: boolean

    rows: TIngredient[]
    ingredientsRequest: boolean
    ingredientsFailure: boolean
}

export const ingredientsInitialState: TIngredientsState = {
    ingredientsTab: "bun",
    ingredientsShowDetails: false,
    rows: [],
    ingredientsRequest: false,
    ingredientsFailure: false,
}

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case "INGREDIENTS_REQUEST": {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailure: false,
            }
        }
        case "INGREDIENTS_SUCCESS": {
            return {
                ...state,
                rows: action.rows,
                ingredientsRequest: false,
            }
        }
        case "INGREDIENTS_FAILURE": {
            return {
                ...state,
                ingredientsFailure: true,
                ingredientsRequest: false,
            }
        }
        case "INGREDIENTS_SET_TAB":
            return {
                ...state,
                ingredientsTab: action.tab
            }
        default: {
            return state;
        }
    }
};
