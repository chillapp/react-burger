import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
} from "../consts/socket";
import {TWSConnect, TWSEventsPayload} from "../types/socket";

interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: TWSConnect
}
export const wsConnectionStart = (payload: TWSConnect): IWSConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload: payload
});

interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: TWSEventsPayload
}
export const wsConnectionSuccess = (payload: TWSEventsPayload): IWSConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS,
    payload: payload
});

interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: TWSEventsPayload
}
export const wsConnectionError = (payload: TWSEventsPayload): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR,
    payload: payload
});

interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: TWSEventsPayload
}
export const wsConnectionClosed = (payload: TWSEventsPayload): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED,
    payload: payload
});

export type TWSSocketActions =
    IWSConnectionStartAction |
    IWSConnectionSuccessAction |
    IWSConnectionErrorAction |
    IWSConnectionClosedAction
