import {
    INGREDIENTS_FAILURE,
    INGREDIENTS_REQUEST,
    INGREDIENTS_SET_TAB,
    INGREDIENTS_SUCCESS,
} from "../consts/ingredients";
import {TIngredient} from "../types/ingredients";
import {AppDispatch, AppThunk} from "../types";
import {checkResponse, checkSuccess, getApiUrl, request} from "../../services/http";

interface IIngredientsRequestAction {
    readonly type: typeof INGREDIENTS_REQUEST;
}
const ingredientsRequest = (): IIngredientsRequestAction => ({
    type: INGREDIENTS_REQUEST
});
interface IIngredientsSuccessAction {
    readonly type: typeof INGREDIENTS_SUCCESS;
    readonly rows: TIngredient[];
}
const ingredientsSuccess = (rows: TIngredient[]): IIngredientsSuccessAction => ({
    type: INGREDIENTS_SUCCESS,
    rows: rows
});
interface IIngredientsFailureAction {
    readonly type: typeof INGREDIENTS_FAILURE;
}
const ingredientsFailure = (): IIngredientsFailureAction => ({
    type: INGREDIENTS_FAILURE,
});

interface IIngredientsSetTabAction {
    readonly type: typeof INGREDIENTS_SET_TAB;
    readonly tab: string;
}

export type TIngredientsActions =
    IIngredientsRequestAction |
    IIngredientsSuccessAction |
    IIngredientsFailureAction |
    IIngredientsSetTabAction

export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(ingredientsRequest());
    const endpoint = getApiUrl('ingredients');
    request<{data: TIngredient[]}>(endpoint)
        .then(data => dispatch(ingredientsSuccess(data.data)))
        .catch(() => dispatch(ingredientsFailure()));
};

export const ingredientsSetTab = (tab: string): IIngredientsSetTabAction => ({
    type: INGREDIENTS_SET_TAB,
    tab
});
