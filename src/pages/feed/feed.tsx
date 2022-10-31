import React, {FC} from "react";
import commonStyles from "../../styles/common.module.css";
import {FeedOrder} from "../../components/feed-order/feed-order";
import styles from "./feed.module.css"

import {useParams} from "react-router-dom";
import {FeedOrderDetails} from "../../components/feed-order-details/feed-order-details";
import { useSelector} from "../../redux/hooks";

export const FeedPage: FC = () => {
    const { id: orderNumber } = useParams<{ id: string }>();

    const { commonFeed } = useSelector(store => store.feed);

    const feedItems = React.useMemo(() => {
        return commonFeed?.orders.map((order) =>{
            return <FeedOrder key={order._id} feedOrder={order} />}
        )
    }, [commonFeed]);

    const ordersDone = React.useMemo(() => {
        const doneItems = commonFeed?.orders.filter(item => item.status === "done") || [];
        return doneItems.map(item => (<span key={item._id} className={`text_type_digits-default text_color_success ${styles.rowHeight}`}>{item.number}</span>));
    }, [commonFeed])

    const ordersPending = React.useMemo(() => {
        const pendingItems = commonFeed?.orders.filter(item => item.status === "pending") || [];
        return pendingItems.map(item => (<span key={item._id} className={`text_type_digits-default ${styles.rowHeight}`}>{item.number}</span>));
    }, [commonFeed])

    return (
        orderNumber
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
