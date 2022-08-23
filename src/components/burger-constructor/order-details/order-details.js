import CommonStyles from '../../../styles/common.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import Spinner from "../../spinner/spinner";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../../services/actions/orders";
import {constructorReset} from "../../../services/actions/constructor";

export default function OrderDetails() {
    const dispatch = useDispatch();

    const { items: cart } = useSelector(store => store.constructor);

    const { order, loading, success } = useSelector(store => store.orders);

    const newOrder = (ids) => {
        dispatch(createOrder(ids));
    }

    React.useEffect(() => {
        if (success) dispatch(constructorReset());
    }, [dispatch, success])

    // eslint-disable-next-line
    React.useEffect(() => newOrder(cart.map(item => item._id)), []);

    const orderDetails = (
        <div className={`${CommonStyles.flexColumn}`}>
            <span className={`text text_type_digits-large ${CommonStyles.textCenter}`}>{order && order.number}</span>
            <span className={`text text_type_main-default ${CommonStyles.textCenter}`}>идентификатор заказа</span>
            <div className={`pt-15 pb-15 ${CommonStyles.textCenter}`}>
                <CheckMarkIcon type={"primary"}/>
            </div>
            <span className={`text text_type_main-small ${CommonStyles.textCenter}`}>Ваш заказ начали готовить</span>
            <span className={`mt-2 text text_color_inactive text_type_main-small ${CommonStyles.textCenter}`}>Дождитесь готовности на орбитальной станции</span>
        </div>
    );

    return loading
        ? (<div className={`${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}><Spinner/></div>)
        : !success
            ? <span>Ошибка создания заказа</span>
            : orderDetails;
}
