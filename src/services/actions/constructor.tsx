import {createAction} from "@reduxjs/toolkit";
import {IIngredient} from "./ingredients";

export const constructorAdd = createAction<IIngredient>('CONSTRUCTOR/ADD');
export const constructorDel = createAction<IIngredient>('CONSTRUCTOR/DEL');
export const constructorReset = createAction('CONSTRUCTOR/RESET');
export const constructorReplace = createAction<{ dragItem: IIngredient, dropItem: IIngredient }>('CONSTRUCTOR/REPLACE');
