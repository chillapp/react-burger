import CommonStyles from '../../../styles/common.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {Spinner} from "../../spinner/spinner";
import {Redirect, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../../../redux/hooks";
import {constructorReset} from "../../../redux/actions/constructor";
import {userCreateOrderThunk} from "../../../redux/actions/user";

export const OrderDetails: FC = () => {
    const dispatch = useDispatch();

    const location = useLocation();

    const {
        user,
        order,
        userCreateOrderRequest,
        userCreateOrderFailure
    } = useSelector(store => store.user);

    const { cart } = useSelector(store => store.burgerConstructor);

    React.useEffect(() => {
        if (order) dispatch(constructorReset());
    }, [dispatch, order])


    React.useEffect(() => {
        if (user) {
            const ingredients = cart.map(item => item._id);
            dispatch(userCreateOrderThunk(ingredients))
        }
    }, [user, dispatch]);

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

    return userCreateOrderRequest
        ? (<div className={`${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}><Spinner/></div>)
        : userCreateOrderFailure
            ? <span>Ошибка создания заказа</span>
            : orderDetails;
}
