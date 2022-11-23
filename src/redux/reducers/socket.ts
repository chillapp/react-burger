import {TWSSocketActions} from "../actions/socket";

type TSocketState = {
    wsConnected: boolean;
    messages: string[];
    error?: Event;
}

export type TSocketsState = {
    [url: string]: TSocketState
}

export const socketInitialState: TSocketsState = { }

export const socketReducer = (state = socketInitialState, action: TWSSocketActions): TSocketsState => {
    switch (action.type) {
        case "WS_CONNECTION_SUCCESS": {
            const { url } = action.payload;
            return {
                [url]: {
                    ...state[url],
                    wsConnected: true,
                }
            }
        }
        case "WS_CONNECTION_ERROR": {
            const { url, event } = action.payload;
            return {
                [url]: {
                    ...state[url],
                    wsConnected: false,
                    error: event
                }
            }
        }
        case "WS_CONNECTION_CLOSED": {
            const { url } = action.payload;
            return {
                [url]: {
                    ...state[url],
                    wsConnected: false,
                    error: undefined
                }
            }
        }
        default: {
            return state;
        }
    }
}
