import {IFeed} from "../../pages/feed/feed";
import {createReducer, current} from "@reduxjs/toolkit";
import {feedUpdate} from "../actions/feed";

const initialState: IFeed = {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
}

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(feedUpdate, (state, { payload }) => {
            const currentState = current(state);
            return { ...currentState, ...payload };
        })
});
