import CommonStyles from '../../../styles/common.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CartContext} from "../../../services/cartContext";
import React from "react";
import Spinner from "../../spinner/spinner";

const api = 'https://norma.nomoreparties.space/api/orders';

export default function OrderDetails() {
    const [request, setRequest] = React.useState({ loading: false, error: null });
    const [order, setOrder] = React.useState(null);

    const [cart] = React.useContext(CartContext);

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
        fetch(api, fetchParams).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`);
        }).then(data => {
            if (data.success) {
                setRequest({loading: false, error: null})
                setOrder({ name: data.name, ...data.order });
            } else {
                return Promise.reject(`Ошибка ${data}`);
            }
        }).catch(error => {
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
