import {COMMON_FEED_UPDATE, PROFILE_FEED_UPDATE} from "../consts/feed";

interface ICommonFeedUpdateAction {
    readonly type: typeof COMMON_FEED_UPDATE;
    readonly feed: string
}
export const commonFeedUpdate = (feed: string): ICommonFeedUpdateAction => ({
    type: COMMON_FEED_UPDATE,
    feed: feed
});

interface IProfileFeedUpdateAction {
    readonly type: typeof PROFILE_FEED_UPDATE;
    readonly feed: string
}
export const profileFeedUpdate = (feed: string): IProfileFeedUpdateAction => ({
    type: PROFILE_FEED_UPDATE,
    feed: feed
});

export type TFeedActions = ICommonFeedUpdateAction | IProfileFeedUpdateAction
