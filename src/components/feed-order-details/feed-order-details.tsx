import {FC, useMemo} from "react";
import {useParams} from "react-router-dom";
import commonStyles from "../../styles/common.module.css";
import styles from "./feed-order-details.module.css"
import {IngredientListItem} from "../burger-ingredients/ingredient-list-item/ingredient-list-item";
import {useSelector} from "../../redux/hooks";


export const FeedOrderDetails: FC<{storeKey: "commonFeed" | "profileFeed"}> = ({storeKey}) => {
    const { id: orderNumber } = useParams<{ id: string }>();
    const feed = useSelector(store => store.feed[storeKey]);
    const orderIndex = feed.orders.findIndex(item => item.number === parseInt(orderNumber, 10));
    const order = feed.orders[orderIndex] || null;

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

    const { rows } = useSelector(store => store.ingredients);
    const ingredients = useMemo(() => rows.filter(item => order?.ingredients.indexOf(item._id) >= 0), [rows, order]);
    const ingredientsEl = useMemo(() => ingredients.map((item, index) => {
        return <IngredientListItem key={index} ingredient={item}/>
    }), [ingredients]);
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
