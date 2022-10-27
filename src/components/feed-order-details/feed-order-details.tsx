import {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import {IIngredients, IStore} from "../../services/store";
import {IFeed} from "../../pages/feed/feed";
import {useParams} from "react-router-dom";
import commonStyles from "../../styles/common.module.css";
import styles from "./feed-order-details.module.css"
import {IngredientListItem} from "../burger-ingredients/ingredient-list-item/ingredient-list-item";


export const FeedOrderDetails: FC = () => {
    const { id: orderNumber } = useParams<{ id: string }>();
    const feedData = useSelector<IStore>(store => store.feed) as IFeed;
    const orderIndex = feedData.orders.findIndex(item => item.number === parseInt(orderNumber, 10));
    const order = feedData.orders[orderIndex] || null;

    let statusName = "";
    switch (order?.status) {
        case "created":
            statusName = "Создан";
            break;
        case "pending":
            statusName = "Готовится";
            break;
        case "done":
            statusName = "Выполнен";
            break;
    }

    const { items: data } = useSelector<IStore>(store => store.ingredients) as IIngredients;
    const ingredients = useMemo(() => data.filter(item => order?.ingredients.indexOf(item._id) >= 0), [data, order]);
    const ingredientsEl = useMemo(() => ingredients.map(item => <IngredientListItem ingredient={item}/>), [ingredients]);
    return (
        <div className={`${commonStyles.flexColumn} ${commonStyles.flexJCCenter} ${commonStyles.flexAICenter}`}>
            <span className="text text_type_digits-default">#{orderNumber}</span>
            <span className={`text text_type_main-default mt-5 ${commonStyles.flexItemASStart}`}>{order?.name}</span>
            <span className={`text text_type_main-default text_color_success mt-1 ${commonStyles.flexItemASStart}`}>{statusName}</span>
            <span className={`text text_type_main-default mt-5 ${commonStyles.flexItemASStart}`}>Состав:</span>
            <ul className={`${commonStyles.wFull} ${styles.list} scrollerY`}>
                {ingredientsEl}
            </ul>
        </div>
    )
}
