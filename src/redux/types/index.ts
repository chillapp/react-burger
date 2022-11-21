import {store} from "../store";
import { ThunkAction } from 'redux-thunk';
import {TIngredientsActions} from "../actions/ingredients";
import {Action, ActionCreator} from "redux";
import {TConstructorActions} from "../actions/constructor";
import {TUserActions} from "../actions/user";
import {TWSSocketActions} from "../actions/socket";
import {TFeedActions} from "../actions/feed";

export type RootState = ReturnType<typeof store.getState>;

export type AppActions =
    TIngredientsActions |
    TConstructorActions |
    TUserActions |
    TWSSocketActions |
    TFeedActions;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, AppActions>
    >;
