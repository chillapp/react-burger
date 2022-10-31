import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppActions, AppDispatch, RootState } from '../types';
import {TWSEventsPayload} from "../types/socket";

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        const sockets: { [url: string]: WebSocket } = {};
        return next => (action: AppActions) => {
            const { dispatch } = store;
            // @ts-ignore
            const { type, payload } = action;
            if (type === 'WS_CONNECTION_START') {
                let url = payload.url;
                const actions = payload.actions;
                const token = payload.token || null;
                if (url && actions) {
                    sockets[url] = new WebSocket(token ? `${url}?token=${token}` : url);
                    sockets[url].onopen = event => {
                        const payload: TWSEventsPayload = {
                            url: url,
                            event: event
                        }
                        dispatch(actions?.wsConnectionSuccess(payload));
                    };
                    sockets[url].onerror = event => {
                        const payload: TWSEventsPayload = {
                            url: url,
                            event: event
                        }
                        dispatch(actions?.wsConnectionError(payload));
                    };
                    sockets[url].onmessage = event => {
                        const { data } = event;
                        dispatch(actions?.wsGetMessage(data));
                    };
                    sockets[url].onclose = event => {
                        const payload: TWSEventsPayload = {
                            url: url,
                            event: event
                        }
                        dispatch(actions?.wsConnectionClosed(payload));
                    };
                }
            }
            next(action);
        };
    }) as Middleware;
};
