import {feedInitialState, feedReducer} from "./feed";
import * as actions from "../consts/feed";

describe('редуктор ленты заказов', () => {
    it('должен вернуть исходное состояние', () => {
        expect(feedReducer(undefined, {})).toEqual({
            commonFeed: {
                orders: [],
                total: 0,
                totalToday: 0,
            },
            profileFeed: {
                orders: [],
                total: 0,
                totalToday: 0,
            }
        })
    });
    it('должен обработать COMMON_FEED_UPDATE', () => {
        expect(
            feedReducer(undefined, {
                type: actions.COMMON_FEED_UPDATE,
                feed: '{"orders":[{"order":1},{"order":2}],"total":1000,"totalToday":25}'
            })
        ).toEqual({
            ...feedInitialState,
            commonFeed: {
                orders: [{
                    order: 1
                },{
                    order: 2
                }],
                total: 1000,
                totalToday: 25,
            }
        })
    });
});
