import {TFeed} from "../types/feed";
import {TFeedActions} from "../actions/feed";

export type TFeedState = {
    commonFeed: TFeed;
    profileFeed: TFeed;
}

export const feedInitialState: TFeedState = {
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
}

export const feedReducer = (state = feedInitialState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case "COMMON_FEED_UPDATE": {
            return {
                ...state,
                commonFeed: JSON.parse(action.feed)
            }
        }
        case "PROFILE_FEED_UPDATE": {
            return {
                ...state,
                profileFeed: JSON.parse(action.feed)
            }
        }
        default: {
            return state;
        }
    }
}
