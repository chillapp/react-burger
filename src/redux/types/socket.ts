import {ICommonFeedUpdateAction, IProfileFeedUpdateAction} from "../actions/feed";
import {IWSConnectionClosedAction, IWSConnectionErrorAction, IWSConnectionSuccessAction} from "../actions/socket";

export type TWSEventsPayload = {
    url: string
    event?: Event | CloseEvent
}

export type TWSActions = {
    wsGetMessage: (payload: string) => ICommonFeedUpdateAction | IProfileFeedUpdateAction
    wsConnectionError: (payload: TWSEventsPayload) => IWSConnectionErrorAction
    wsConnectionClosed: (payload: TWSEventsPayload) => IWSConnectionClosedAction
    wsConnectionSuccess: (payload: TWSEventsPayload) => IWSConnectionSuccessAction
}

export type TWSConnect = {
    url: string
    token?: string
    actions: TWSActions
}
