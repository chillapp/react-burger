import React from "react";
import PropTypes from 'prop-types';
import commonStyles from "../../styles/common.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ingredientType from "../../utils/types";

export default function BurgerPage({ data }) {
    const [cart, setCart] = React.useState([]);

    const addToCart = (item) => {
        const newCart = [...cart];
        if (item.type === 'bun') {
            const bunIndex = newCart.findIndex(cartItem => cartItem.type === 'bun');
            if (bunIndex >= 0) newCart.splice(bunIndex, 1);
        }
        newCart.push(Object.assign({}, item));
        newCart.forEach((item, index) => item.lineno = index + 1);
        setCart(newCart);
    }

    const deleteFromCart = (deleteItem) => {
        const newCart = [...cart];
        const deleteItemIndex = newCart.findIndex(item => item.lineno === deleteItem.lineno);
        newCart.splice(deleteItemIndex, 1);
        newCart.forEach((item, index) => item.lineno = index + 1);
        setCart(newCart);
    }

    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
            <BurgerIngredients data={data} cart={cart} addToCart={addToCart} />
            <BurgerConstructor cart={cart} deleteFromCart={deleteFromCart}/>
        </section>
    );
}

BurgerPage.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}
