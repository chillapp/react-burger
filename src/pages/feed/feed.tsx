import React, {FC, useEffect} from "react";
import commonStyles from "../../styles/common.module.css";
import {FeedOrder} from "../../components/feed-order/feed-order";
import styles from "./feed.module.css"

import {useParams} from "react-router-dom";
import {FeedOrderDetails} from "../../components/feed-order-details/feed-order-details";
import {useDispatch, useSelector} from "../../redux/hooks";
import {TWSConnect} from "../../redux/types/socket";
import {getWsApiUrl} from "../../services/http";
import {commonFeedUpdate} from "../../redux/actions/feed";
import {
    wsConnectionClose,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionStart,
    wsConnectionSuccess
} from "../../redux/actions/socket";
import {Spinner} from "../../components/spinner/spinner";

export const FeedPage: FC = () => {
    const { id: orderNumber } = useParams<{ id: string }>();

    const { commonFeed } = useSelector(store => store.feed);

    const feedItems = React.useMemo(() => {
        return commonFeed?.orders.map((order) =>{
            return <FeedOrder key={order._id} feedOrder={order} />}
        )
    }, [commonFeed]);

    const dispatch = useDispatch();
    const wsURL = getWsApiUrl("orders/all");
    useEffect(() => {
        const payload: TWSConnect = {
            url: wsURL,
            actions: {
                wsGetMessage: commonFeedUpdate,
                wsConnectionError: wsConnectionError,
                wsConnectionClosed: wsConnectionClosed,
                wsConnectionSuccess: wsConnectionSuccess
            }
        }
        dispatch(wsConnectionStart(payload));
        return () => {
            dispatch(wsConnectionClose({ url: wsURL }));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const wsConnected = useSelector(store => store.socket[wsURL]?.wsConnected) || false;
    const [loading, setLoading] = React.useState<boolean>(!wsConnected);
    useEffect(() => {
        setLoading(!wsConnected)
    }, [wsConnected])

    const ordersDone = React.useMemo(() => {
        const doneItems = commonFeed?.orders.filter(item => item.status === "done") || [];
        return doneItems.map(item => (<span key={item._id} className={`text_type_digits-default text_color_success ${styles.rowHeight}`}>{item.number}</span>));
    }, [commonFeed])

    const ordersPending = React.useMemo(() => {
        const pendingItems = commonFeed?.orders.filter(item => item.status === "pending") || [];
        return pendingItems.map(item => (<span key={item._id} className={`text_type_digits-default ${styles.rowHeight}`}>{item.number}</span>));
    }, [commonFeed])

    return (
        loading
            ? <Spinner centered={true} />
            : orderNumber
                ?
                <div className={`
                    ${commonStyles.wFull}
                    ${commonStyles.hFull}
                    ${commonStyles.flexRow}
                    ${commonStyles.flexJCCenter}
                    mt-10
                `}>
                    <div className={`${styles.ordersDetailsItem}`}><FeedOrderDetails storeKey="commonFeed" /></div>
                </div>
                : <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
                    <div className={`${commonStyles.flexRow}`}>
                        <div className={`${commonStyles.flexColumn} mt-5`}>
                            <span className="text text_type_main-large">Лента заказов</span>
                            <ul className={`scrollerY ${commonStyles.flexColumn} ${styles.list} ${commonStyles.overflowXHidden}`}>
                                { feedItems }
                            </ul>
                        </div>
                        <div className={`${commonStyles.flexColumn} mt-5`}>
                            <span className="text text_type_main-large">&nbsp;</span>
                            <div className={`p-3 pl-5 ${commonStyles.flexColumn}`}>
                                <div className={`${commonStyles.flexRow} ${styles.ordersDetailsContent} ${styles.ordersDetailsQueue}`}>
                                    <div className={`${commonStyles.flexFill}`}>
                                        <span className="text text_type_main-medium">Готовы:</span>
                                        <div className={`${commonStyles.flexColumn} ${commonStyles.flexWrap} ${commonStyles.hFull}`}>{ordersDone}</div>
                                    </div>
                                    <div className={`${commonStyles.flexFill}`}>
                                        <span className="text text_type_main-medium">В работе:</span>
                                        <div className={`${commonStyles.flexColumn} ${commonStyles.flexWrap} ${commonStyles.hFull}`}>{ordersPending}</div>
                                    </div>
                                </div>
                                <div className={`pt-15 ${commonStyles.flexColumn}`}>
                                    <span className="text text_type_main-medium">Выполнено за всё время:</span>
                                    <span className={`text text_type_digits-large ${styles.textShadow}`}>{commonFeed?.total}</span>
                                </div>
                                <div className={`pt-15 ${commonStyles.flexColumn}`}>
                                    <span className="text text_type_main-medium">Выполнено за сегодня:</span>
                                    <span className={`text text_type_digits-large ${styles.textShadow}`}>{commonFeed?.totalToday}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

    );
}
