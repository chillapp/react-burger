import React from "react";
import PropTypes from 'prop-types';
import commonStyles from "../../styles/common.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ingredientType from "../../utils/types";
import {CartContext} from "../../services/cartContext";

export default function BurgerPage({ data }) {

    const cartReducer = (cart, action) => {

        const addToCart = (item) => {
            const newCart = [...cart];
            if (item.type === 'bun') {
                const bunIndex = newCart.findIndex(cartItem => cartItem.type === 'bun');
                if (bunIndex >= 0) newCart.splice(bunIndex, 1);
            }
            newCart.push(Object.assign({}, item));
            newCart.forEach((item, index) => item.lineno = index + 1);
            return newCart;
        }

        const deleteFromCart = (deleteItem) => {
            const newCart = [...cart];
            const deleteItemIndex = newCart.findIndex(item => item.lineno === deleteItem.lineno);
            newCart.splice(deleteItemIndex, 1);
            newCart.forEach((item, index) => item.lineno = index + 1);
            return newCart;
        }

        switch (action.type) {
            case 'append':
                return addToCart(action.payload);
            case 'remove':
                return deleteFromCart(action.payload);
            default: throw new Error(`Wrong type of action: ${action.type}`);
        }
    }
    const cartState = React.useReducer(cartReducer, [], undefined);

    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
            <CartContext.Provider value={cartState}>
                <BurgerIngredients data={data} />
                <BurgerConstructor />
            </CartContext.Provider>
        </section>
    );
}

BurgerPage.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired
}
