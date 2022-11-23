import {ingredientsReducer} from "./ingredients";
import * as actions from "../consts/ingredients";

const ingredients = [{
    _id: "uuid_str",
    name: "ingredient_name",
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    type: "main",
    calories: 1000,
    price: 10.52,
    image: "url",
    image_mobile: "mobile_url",
    image_large: "large_url",
    __v: 1999,
    uuid: "uuid-str"
}]

describe('редуктор ингредиентов', () => {
    it('должен вернуть исходное состояние', () => {
        expect(ingredientsReducer(undefined, {})).toEqual({
            ingredientsTab: "bun",
            ingredientsShowDetails: false,
            rows: [],
            ingredientsRequest: false,
            ingredientsFailure: false,
        })
    });
    it('должен обработать INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(undefined, {
                type: actions.INGREDIENTS_REQUEST,
            })
        ).toEqual({
            ingredientsTab: "bun",
            ingredientsShowDetails: false,
            rows: [],
            ingredientsRequest: true,
            ingredientsFailure: false,
        })

        expect(
            ingredientsReducer(undefined, {
                type: actions.INGREDIENTS_SUCCESS,
                rows: ingredients
            })
        ).toEqual({
            ingredientsTab: "bun",
            ingredientsShowDetails: false,
            rows: ingredients,
            ingredientsRequest: false,
            ingredientsFailure: false,
        })

        expect(
            ingredientsReducer(undefined, {
                type: actions.INGREDIENTS_FAILURE,
            })
        ).toEqual({
            ingredientsTab: "bun",
            ingredientsShowDetails: false,
            rows: [],
            ingredientsRequest: false,
            ingredientsFailure: true,
        })
    })
    it('должен обработать INGREDIENTS_SET_TAB', () => {
        expect(
            ingredientsReducer(undefined, {
                type: actions.INGREDIENTS_SET_TAB,
                tab: "sauce"
            })
        ).toEqual({
            ingredientsTab: "sauce",
            ingredientsShowDetails: false,
            rows: [],
            ingredientsRequest: false,
            ingredientsFailure: false,
        })
        expect(
            ingredientsReducer(undefined, {
                type: actions.INGREDIENTS_SET_TAB,
                tab: "main"
            })
        ).toEqual({
            ingredientsTab: "main",
            ingredientsShowDetails: false,
            rows: [],
            ingredientsRequest: false,
            ingredientsFailure: false,
        })
        expect(
            ingredientsReducer(undefined, {
                type: actions.INGREDIENTS_SET_TAB,
                tab: "bun"
            })
        ).toEqual({
            ingredientsTab: "bun",
            ingredientsShowDetails: false,
            rows: [],
            ingredientsRequest: false,
            ingredientsFailure: false,
        })
    })
});
