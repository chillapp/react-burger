
import * as actions from "../consts/socket";
import {socketReducer} from "./socket";

describe('редуктор сокетов', () => {
    it('должен вернуть исходное состояние', () => {
        expect(socketReducer(undefined, {})).toEqual({})
    });
    it('должен обработать COMMON_FEED_UPDATE', () => {
        expect(
            socketReducer(undefined, {
                type: actions.WS_CONNECTION_SUCCESS,
                payload: { url: 'url_for_socket_connection' }
            })
        ).toEqual({
            'url_for_socket_connection': {
                wsConnected: true,
            }
        })
    });
    it('должен обработать WS_CONNECTION_ERROR', () => {
        expect(
            socketReducer(undefined, {
                type: actions.WS_CONNECTION_ERROR,
                payload: { url: 'url_for_socket_connection', event: 'error event' }
            })
        ).toEqual({
            'url_for_socket_connection': {
                wsConnected: false,
                error: 'error event'
            }
        })
    });
    it('должен обработать WS_CONNECTION_CLOSED', () => {
        expect(
            socketReducer(undefined, {
                type: actions.WS_CONNECTION_CLOSED,
                payload: { url: 'url_for_socket_connection' }
            })
        ).toEqual({
            'url_for_socket_connection': {
                wsConnected: false,
                error: undefined
            }
        })
    });
});
