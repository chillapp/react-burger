import CommonStyles from '../../../styles/common.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CartContext} from "../../../services/cartContext";
import React from "react";
import Spinner from "../../spinner/spinner";
import { checkResponse, checkSuccess } from "../../../services/http";
import {getApiUrl} from "../../app/app";

export default function OrderDetails() {
    const [request, setRequest] = React.useState({ loading: false, error: null });
    const [order, setOrder] = React.useState(null);

    const [cart, setCart] = React.useContext(CartContext);

    const createOrder = (ids) => {
        setOrder(null);
        setRequest({loading: true, error: null});
        const fetchParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients: ids }),
        };
        fetch(getApiUrl('orders'), fetchParams)
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => {
                setCart({type: 'reset'});
                setRequest({loading: false, error: null})
                setOrder({ name: payload.name, ...payload.order });
            })
            .catch(error => {
                setOrder(null);
                setRequest({ loading: false, error: error });
            });
    }

    React.useEffect(() => createOrder(cart.map(item => item._id)), []);

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

    return request.loading ? (<div className={`${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}><Spinner/></div>) : request.error ? <span>{ request.error }</span> : orderDetails;
}
