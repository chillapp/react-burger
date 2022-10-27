import {ISocketEvents, useSocket} from "../../services/hooks/use-socket";
import {getWsApiUrl} from "../../services/http";
import React, {FC, useEffect} from "react";
import commonStyles from "../../styles/common.module.css";
import {FeedOrder} from "../../components/feed-order/feed-order";
import styles from "./feed.module.css"
import {Spinner} from "../../components/spinner/spinner";
import {useDispatch, useSelector} from "react-redux";
import {feedUpdate} from "../../services/actions/feed";
import {IStore} from "../../services/store";
import {useParams} from "react-router-dom";
import {FeedOrderDetails} from "../../components/feed-order-details/feed-order-details";


export interface IFeedOrder {
    _id: string
    status: "created" | "pending" | "done"
    name: string
    number: number
    updatedAt: string
    createdAt: string
    ingredients: string[]
}

export interface IFeed {
    orders: IFeedOrder[]
    success: boolean
    total: number
    totalToday: number
}

export const FeedPage: FC = () => {
    const dispatch = useDispatch()

    const { id: orderNumber } = useParams<{ id: string }>();

    const feedData = useSelector<IStore>(store => store.feed) as IFeed
    const [loading, setLoading] = React.useState<boolean>(true);

    const wsHandler: ISocketEvents = {
        onMessage: event => {
            console.log("onMessage");
            setLoading(false);
            dispatch(feedUpdate(JSON.parse(event.data)));
        }
    }

    const { connect } = useSocket(getWsApiUrl("orders/all"), wsHandler);

    useEffect(() => {
        connect()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const feedItems = React.useMemo(() => {
        return feedData?.orders.map((order) =>{
            return <FeedOrder key={order._id} feedOrder={order} />}
        )
    }, [feedData]);

    const ordersDone = React.useMemo(() => {
        const doneItems = feedData?.orders.filter(item => item.status === "done") || [];
        return doneItems.map(item => (<span key={item._id} className={`text_type_digits-default text_color_success ${styles.rowHeight}`}>{item.number}</span>));
    }, [feedData])

    const ordersPending = React.useMemo(() => {
        const pendingItems = feedData?.orders.filter(item => item.status === "pending") || [];
        return pendingItems.map(item => (<span key={item._id} className={`text_type_digits-default ${styles.rowHeight}`}>{item.number}</span>));
    }, [feedData])

    return (
        loading
            ? <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} ${commonStyles.flexAICenter}`}><Spinner /></section>
            : orderNumber
                ?
                <div className={`
                    ${commonStyles.wFull}
                    ${commonStyles.hFull}
                    ${commonStyles.flexRow}
                    ${commonStyles.flexJCCenter}
                    mt-10
                `}>
                    <div className={`${styles.ordersDetailsItem}`}><FeedOrderDetails /></div>
                </div>
                : <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
                    <div className={`${commonStyles.flexRow}`}>
                        <div className={`${commonStyles.flexColumn} mt-5`}>
                            <span className="text text_type_main-large">Лента заказов</span>
                            <ul className={`scrollerY ${commonStyles.flexColumn} ${styles.list}`}>
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
                                    <span className={`text text_type_digits-large ${styles.textShadow}`}>{feedData?.total}</span>
                                </div>
                                <div className={`pt-15 ${commonStyles.flexColumn}`}>
                                    <span className="text text_type_main-medium">Выполнено за сегодня:</span>
                                    <span className={`text text_type_digits-large ${styles.textShadow}`}>{feedData?.totalToday}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    );
}
