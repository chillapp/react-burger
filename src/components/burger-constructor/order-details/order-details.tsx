import CommonStyles from '../../../styles/common.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {Spinner} from "../../spinner/spinner";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../../services/actions/orders";
import {constructorReset} from "../../../services/actions/constructor";
import {Redirect, useLocation} from "react-router-dom";
import {IAuth, IConstructor, IOrders, IStore} from "../../../services/store";
import {AnyAction} from "redux";

export const OrderDetails: FC = () => {
    const dispatch = useDispatch();

    const location = useLocation();

    const { user } = useSelector<IStore>(store => store.auth) as IAuth;

    const { items: cart } = useSelector<IStore>(store => store.constructor) as IConstructor;

    const { order, loading, success } = useSelector<IStore>(store => store.orders) as IOrders;

    const newOrder = (ids: Array<string>) => {
        dispatch(createOrder(ids) as AnyAction);
    }

    React.useEffect(() => {
        if (success) dispatch(constructorReset());
    }, [dispatch, success])

    // eslint-disable-next-line
    React.useEffect(() => {
        if (user) newOrder(cart.map(item => item._id))
    }, []);

    if (!user) {
        return <Redirect to={{
            pathname: '/login',
            state: {
                from: location.pathname
            }
        }} />;
    }

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
