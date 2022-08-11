import React from "react";
import PropTypes from 'prop-types';
import BurgerConstructorItem from "./burger-construcor-item/burger-constructor-item";
import BurgerConstructorBunItem from "./burger-construcor-bun-item/burger-constructor-bun-item";
import commonStyles from '../../styles/common.module.css';
import styles from './burger-construtor.module.css';

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

export default function BurgerConstructor({ cart, deleteFromCart }) {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [createOrder, setCreateOrder] = React.useState(false);

    React.useEffect(() => {
        let total = 0;
        cart.forEach(item => total += item.price);
        setTotalPrice(total);
    }, [cart]);

    const showCreateOrderModal = () => setCreateOrder(true);
    const closeCreateOrderModal = () => setCreateOrder(false);

    const bunItem = cart.filter(x => x.type === 'bun');
    return (
        <div style={{overflow: 'hidden'}}>
            <section className={`pt-25 ml-10 ${commonStyles.flexColumn} ${styles.content}`}>
                {bunItem.length ? <BurgerConstructorBunItem role='top' bun={bunItem[0]} /> : null}
                <ul className={`scrollerY ${commonStyles.flexColumn} ${styles.list}`}>
                    {

                        cart.filter(x => x.type !== 'bun').map((cartItem, index) =>
                            <BurgerConstructorItem
                                key={index}
                                cartItem={cartItem}
                                deleteItem={deleteFromCart}
                            />
                        )

                    }
                </ul>
                {bunItem.length ? <BurgerConstructorBunItem role='bottom' bun={bunItem[0]} /> : null}
                <div style={{visibility: totalPrice > 0 ? 'visible' : 'hidden'}} className={`pt-10 ${commonStyles.flexRow} ${commonStyles.flexAICenter} ${commonStyles.flexJCRight}`}>
                    <span className='text text_type_digits-medium'>{totalPrice}</span>
                    <CurrencyIcon type='primary'/>
                    <div className='ml-10'>
                        <Button onClick={showCreateOrderModal}>Оформить заказ</Button>
                    </div>
                </div>
            </section>
            {createOrder &&
                (
                    <Modal header={'Детали заказа'} onClose={closeCreateOrderModal}>
                        <OrderDetails/>
                    </Modal>
                )
            }

        </div>
    );
}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(ingredientType),
    deleteFromCart: PropTypes.func.isRequired
}
