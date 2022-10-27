import React, {FC, useEffect} from "react";
import {ISocketEvents, useSocket} from "../../../services/hooks/use-socket";
import {feedUpdate} from "../../../services/actions/feed";
import {getWsApiUrl} from "../../../services/http";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../../services/store";
import {getCookie} from "../../../utils/common";
import {IFeed} from "../../feed/feed";
import {Spinner} from "../../../components/spinner/spinner";
import commonStyles from "../../../styles/common.module.css";
import {FeedOrder} from "../../../components/feed-order/feed-order";
import styles from "./orders.module.css"
import {useParams} from "react-router-dom";
import {FeedOrderDetails} from "../../../components/feed-order-details/feed-order-details";


export const ProfileOrdersPage: FC = () => {
    const dispatch = useDispatch()

    const { id: orderNumber } = useParams<{ id: string }>();

    const feedData = useSelector<IStore>(store => store.feed) as IFeed
    const [loading, setLoading] = React.useState<boolean>(true);

    const wsHandler: ISocketEvents = {
        onMessage: event => {
            setLoading(false);
            dispatch(feedUpdate(JSON.parse(event.data)));
        }
    }

    const { connect } = useSocket(getWsApiUrl(`orders`), wsHandler);

    useEffect(() => {
        const tokenParts = getCookie("accessToken").split(" ");
        connect(tokenParts[1]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const feedItems = React.useMemo(() => {
        return feedData?.orders.map((order) =>{
            return <FeedOrder key={order._id} feedOrder={order} />}
        )
    }, [feedData]);
    return (
        loading
            ? <div className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter}`}><Spinner/></div>
            : orderNumber
                ? <div className={`
                    ${commonStyles.wFull}
                    ${commonStyles.hFull}
                    ${commonStyles.flexRow}
                    ${commonStyles.flexJCCenter}
                    mt-10
                `}>
                    <div className={`${styles.ordersDetailsItem}`}><FeedOrderDetails /></div>
                </div>
                : feedData.orders.length === 0
                    ? <div className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter}`}>Список заказов пуст</div>
                    : <ul className={`${commonStyles.overflowAuto} ${styles.container} scrollerY`} >{ feedItems }</ul>
    );
}
