import React from "react";
import BurgerConstructorItem from "./burger-construcor-item/burger-constructor-item";
import BurgerConstructorBunItem from "./burger-construcor-bun-item/burger-constructor-bun-item";
import commonStyles from '../../styles/common.module.css';
import styles from './burger-construtor.module.css';

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ConstructorAdd} from "../../services/actions/constructor";

export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(ConstructorAdd(item))
        },
    });

    const [createOrder, setCreateOrder] = React.useState(false);

    const { items: cart, totalPrice } = useSelector(store => store.constructor);

    const showCreateOrderModal = () => setCreateOrder(true);
    const closeCreateOrderModal = () => setCreateOrder(false);

    const bunItem = React.useMemo(() => cart.filter(x => x.type === 'bun'), [cart]);
    const ingredientItems = React.useMemo(() => {
        return cart.filter(x => x.type !== 'bun').map((cartItem) =>
            <BurgerConstructorItem
                key={cartItem.uuid}
                cartItem={cartItem}
            />
        )
    }, [cart]);

    return (
        <>
            <section ref={dropTarget} className={`pt-25 ml-10 ${commonStyles.flexColumn} ${styles.content}`}>
                <BurgerConstructorBunItem role='top' bun={bunItem && bunItem[0]} />
                    <ul className={`scrollerY ${commonStyles.flexColumn} ${styles.list}`}>
                        { ingredientItems }
                    </ul>
                <BurgerConstructorBunItem role='bottom' bun={bunItem && bunItem[0]} />
                <div style={{visibility: totalPrice > 0 ? 'visible' : 'hidden'}} className={`pt-10 ${commonStyles.flexRow} ${commonStyles.flexAICenter} ${commonStyles.flexJCRight}`}>
                    <span className='text text_type_digits-medium'>{totalPrice}</span>
                    <CurrencyIcon type='primary'/>
                    <div className='ml-10'>
                        <Button onClick={showCreateOrderModal}>Оформить заказ</Button>
                    </div>
                </div>
            </section>
            {createOrder && (
                    <Modal isOpen={createOrder} header={'Детали заказа'} onClose={closeCreateOrderModal}>
                        <OrderDetails/>
                    </Modal>
            )}
        </>
    );
}
