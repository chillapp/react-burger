import {createAction} from "@reduxjs/toolkit";
import {IFeed} from "../../pages/feed/feed";

export const feedUpdate = createAction<IFeed>('FEED/UPDATE');
