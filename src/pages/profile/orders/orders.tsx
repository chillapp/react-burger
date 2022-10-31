import React, {FC} from "react";
import commonStyles from "../../../styles/common.module.css";
import {FeedOrder} from "../../../components/feed-order/feed-order";
import styles from "./orders.module.css"
import {useParams} from "react-router-dom";
import {FeedOrderDetails} from "../../../components/feed-order-details/feed-order-details";
import {useSelector} from "../../../redux/hooks";


export const ProfileOrdersPage: FC = () => {
    const { id: orderNumber } = useParams<{ id: string }>();

    const { profileFeed } = useSelector(store => store.feed)

    const feedItems = React.useMemo(() => {
        return profileFeed.orders.map((order) =>{
            return <FeedOrder key={order._id} feedOrder={order} />}
        )
    }, [profileFeed]);
    return (
        orderNumber
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
