import React, {FC, useEffect} from "react";
import commonStyles from "../../../styles/common.module.css";
import {FeedOrder} from "../../../components/feed-order/feed-order";
import styles from "./orders.module.css"
import {useParams} from "react-router-dom";
import {FeedOrderDetails} from "../../../components/feed-order-details/feed-order-details";
import {useDispatch, useSelector} from "../../../redux/hooks";
import {getWsApiUrl} from "../../../services/http";
import {getCookie} from "../../../utils/common";
import {TWSConnect} from "../../../redux/types/socket";
import {profileFeedUpdate} from "../../../redux/actions/feed";
import {
    wsConnectionClose,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionStart,
    wsConnectionSuccess
} from "../../../redux/actions/socket";
import {Spinner} from "../../../components/spinner/spinner";


export const ProfileOrdersPage: FC = () => {
    const dispatch = useDispatch()
    const profileSocketURL = getWsApiUrl("orders");
    useEffect(() => {
        const token = getCookie("accessToken").replace("Bearer ", "");
        const payload: TWSConnect = {
            token: token,
            url: profileSocketURL,
            actions: {
                wsGetMessage: profileFeedUpdate,
                wsConnectionError: wsConnectionError,
                wsConnectionClosed: wsConnectionClosed,
                wsConnectionSuccess: wsConnectionSuccess
            }
        }
        dispatch(wsConnectionStart(payload));
        return () => {
            dispatch(wsConnectionClose({ url: profileSocketURL }));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const wsConnected = useSelector(store => store.socket[profileSocketURL]?.wsConnected) || false;
    const [loading, setLoading] = React.useState<boolean>(!wsConnected);
    useEffect(() => {
        setLoading(!wsConnected)
    }, [wsConnected])

    const { id: orderNumber } = useParams<{ id: string }>();

    const { profileFeed } = useSelector(store => store.feed);

    const feedItems = React.useMemo(() => {
        return profileFeed.orders.map((order) =>{
            return <FeedOrder key={order._id} feedOrder={order} />}
        )
    }, [profileFeed]);
    return (
        loading
            ? <Spinner centered={true}/>
            : orderNumber
                ? <div className={`
                    ${commonStyles.wFull}
                    ${commonStyles.hFull}
                    ${commonStyles.flexRow}
                    ${commonStyles.flexJCCenter}
                    mt-10
                `}>
                    <div className={`${styles.ordersDetailsItem}`}><FeedOrderDetails storeKey="profileFeed" /></div>
                </div>
                : profileFeed.orders.length === 0
                    ? <div className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter}`}>Список заказов пуст</div>
                    : <ul className={`${commonStyles.overflowAuto} ${styles.container} scrollerY`} >{ feedItems }</ul>
    );
}
