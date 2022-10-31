import React, {FC, useCallback} from "react";
import commonStyles from '../../styles/common.module.css';
import styles from './feed-order.module.css';
import Moment from "react-moment";
import 'moment/locale/ru';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector} from "../../redux/hooks";
import {TFeedOrder} from "../../redux/types/feed";

export const FeedOrder: FC<{ feedOrder: TFeedOrder }> = ({ feedOrder }) => {
    const { rows } = useSelector(store => store.ingredients)
    const ingredients = rows.filter(item => feedOrder.ingredients.indexOf(item._id) >= 0);
    const totalPrice = React.useMemo(() => ingredients.reduce((acc, item) => acc + item.price, 0), [ingredients]);
    const imgs = React.useMemo(() => ingredients.map(item => (<img key={item._id} className={`${styles.ingredientLogo}`} src={item.image_mobile}  alt={""}/>)), [ingredients]);

    const history = useHistory();
    const location = useLocation();
    const goToOrder = useCallback(() => {
        history.replace({
            pathname: `${location.pathname}/${feedOrder.number}`,
            state: { background: location }
        });
    }, [feedOrder.number, history, location])
    return (
        <div onClick={goToOrder} className={`
        p-5 m-1
        ${commonStyles.flexColumn} 
        ${commonStyles.cursorPointer} 
        ${commonStyles.panelColor} 
        ${styles.contentContainer} 
        ${commonStyles.borderRadius24}
        `}>
            <div className={`${commonStyles.flexRow} ${commonStyles.flexJCBetween} ${commonStyles.flexAICenter}`}>
                <span className='text text_type_digits-default'>#{feedOrder.number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    <Moment locale="ru" calendar>{feedOrder.createdAt}</Moment>
                </span>
            </div>
            <span className="mt-3 text text_type_main-default">{feedOrder.name}</span>
            <div className={`mt-3 ${commonStyles.flexRow} ${commonStyles.flexJCBetween} ${commonStyles.flexAICenter}`}>
                <div className={`${commonStyles.flexRowReverse}`}>
                    { imgs }
                </div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexAICenter}`}>
                    <span>{totalPrice}</span>
                    <div className={`ml-1`}>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
