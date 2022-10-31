import {CONSTRUCTOR_ADD, CONSTRUCTOR_DEL, CONSTRUCTOR_REPLACE, CONSTRUCTOR_RESET} from "../consts/constructor";
import {TIngredient} from "../types/ingredients";
import {TConstructorDND} from "../types/constructor";

interface IConstructorAddAction {
    readonly type: typeof CONSTRUCTOR_ADD;
    readonly ingredient: TIngredient
}
export const constructorAdd = (ingredient: TIngredient): IConstructorAddAction => ({
    type: CONSTRUCTOR_ADD,
    ingredient: ingredient
});

interface IConstructorDelAction {
    readonly type: typeof CONSTRUCTOR_DEL;
    readonly ingredient: TIngredient
}
export const constructorDel = (ingredient: TIngredient): IConstructorDelAction => ({
    type: CONSTRUCTOR_DEL,
    ingredient: ingredient
});

interface IConstructorReplaceAction {
    readonly type: typeof CONSTRUCTOR_REPLACE;
    readonly data: TConstructorDND
}
export const constructorReplace = (data: TConstructorDND): IConstructorReplaceAction => ({
    type: CONSTRUCTOR_REPLACE,
    data: data
});

interface IConstructorResetAction {
    readonly type: typeof CONSTRUCTOR_RESET;
}
export const constructorReset = (): IConstructorResetAction => ({
    type: CONSTRUCTOR_RESET,
});

export type TConstructorActions =
    IConstructorAddAction |
    IConstructorDelAction |
    IConstructorReplaceAction |
    IConstructorResetAction
