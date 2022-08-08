import React from "react";
import PropTypes from 'prop-types';
import BurgerConstructorItem from "./burger-construcor-item/burger-constructor-item";
import BurgerConstructorBunItem from "./burger-construcor-bun-item/burger-constructor-bun-item";
import commonStyles from '../../styles/common.module.css';
import styles from './burger-construtor.module.css';

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";

class BurgerConstructor extends React.Component {

    render() {
        const {cart, deleteFromCart} = this.props;
        const bunItem = cart.filter(x => x.type === 'bun');
        return (
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
                <div style={{visibility: this.calcCartTotal() > 0 ? 'visible' : 'hidden'}} className={`pt-10 ${commonStyles.flexRow} ${commonStyles.flexAICenter} ${commonStyles.flexJCRight}`}>
                    <span className='text text_type_digits-medium'>{this.calcCartTotal()}</span>
                    <CurrencyIcon type='primary'/>
                    <div className='ml-10'>
                        <Button>Оформить заказ</Button>
                    </div>
                </div>
            </section>
        );
    }

    calcCartTotal = () => {
        let total = 0;
        this.props.cart.forEach(item => total += item.price);
        return total;
    }

}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(ingredientType),
    deleteFromCart: PropTypes.func.isRequired
}

export default BurgerConstructor;
