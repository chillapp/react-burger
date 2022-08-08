import React from "react";
import PropTypes from 'prop-types';
import BurgerConstructorItem from "./burger-construcor-item/burger-constructor-item";
import BurgerConstructorBunItem from "./burger-construcor-bun-item/burger-constructor-bun-item";
import commonStyles from '../../styles/common.module.css';

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsItem from "../burger-ingridients/burger-ingridients-item/burger-ingridients-item";

class BurgerConstructor extends React.Component {

    render() {
        const {cart, deleteFromCart} = this.props;
        const bunItem = cart.filter(x => x.type === 'bun');
        return (
            <section style={{ width: '600px' }} className={`pt-25 ${commonStyles.flexColumn}`}>
                {bunItem.length ? <BurgerConstructorBunItem role='top' bun={bunItem[0]} /> : null}
                <section className={`scrollerY ${commonStyles.flexColumn} mt-4`}>
                    {

                            cart.filter(x => x.type !== 'bun').map((cartItem, index) =>
                                <BurgerConstructorItem
                                    key={index}
                                    cartItem={cartItem}
                                    deleteItem={deleteFromCart}
                                />
                            )

                    }
                </section>
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
    cart: PropTypes.arrayOf(BurgerIngridientsItem.propTypes.data),
    deleteFromCart: PropTypes.func.isRequired
}

export default BurgerConstructor;
