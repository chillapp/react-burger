import type {Middleware, MiddlewareAPI} from 'redux';

import type {AppActions, AppDispatch, RootState} from '../types';
import {TWSConnect, TWSEventsPayload} from "../types/socket";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../consts/socket";
import {wsConnectionStart} from "../actions/socket";

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        const sockets: { [url: string]: { socket: WebSocket, connectData: TWSConnect } } = {};
        return next => (action: AppActions) => {
            const { dispatch } = store;

            const { type } = action;
            if (type === WS_CONNECTION_START) {
                const { payload } = action;
                const { url, actions, token } = payload;
                if (url && actions) {
                    if (sockets[url] && sockets[url].socket.readyState === WebSocket.OPEN) {
                        sockets[url].socket.close();
                    }
                    sockets[url] = {
                        socket: new WebSocket(token ? `${url}?token=${token}` : url),
                        connectData: payload
                    };
                    sockets[url].socket.onopen = event => {
                        const payload: TWSEventsPayload = {
                            url: url,
                            event: event
                        }
                        dispatch(actions.wsConnectionSuccess(payload));
                    };
                    sockets[url].socket.onerror = event => {
                        const payload: TWSEventsPayload = {
                            url: url,
                            event: event
                        }
                        dispatch(actions.wsConnectionError(payload));
                        setTimeout(() => {
                            dispatch(wsConnectionStart(sockets[url].connectData));
                        }, 1000);
                    };
                    sockets[url].socket.onmessage = event => {
                        const { data } = event;
                        dispatch(actions.wsGetMessage(data));
                    };
                    sockets[url].socket.onclose = event => {
                        const payload: TWSEventsPayload = {
                            url: url,
                            event: event
                        }
                        dispatch(actions.wsConnectionClosed(payload));
                    };
                }
            } else if (type === WS_CONNECTION_CLOSE) {
                const { payload: { url } } = action;
                if (url) {
                    sockets[url].socket.close();
                }
            }
            next(action);
        };
    }) as Middleware;
};
