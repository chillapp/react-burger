import React from "react";
import PropTypes from 'prop-types';
import commonStyles from "../../styles/common.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ingredientType from "../../utils/types";

class BurgerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: [],
        }
    }

    render() {
        const { data } = this.props;
        return (
            <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
                <BurgerIngredients data={data} cart={this.state.cart} addToCart={this.addToCart} />
                <BurgerConstructor cart={this.state.cart} deleteFromCart={this.deleteFromCart}/>
            </section>
        );
    }

    addToCart = (item) => {
        const newCart = [...this.state.cart];
        if (item.type === 'bun') {
            const bunIndex = newCart.findIndex(cartItem => cartItem.type === 'bun');
            if (bunIndex >= 0) newCart.splice(bunIndex, 1);
        }
        newCart.push(Object.assign({}, item));
        newCart.forEach((item, index) => item.lineno = index + 1);
        this.setState(state => state.cart = newCart);
    }

    deleteFromCart = (deleteItem) => {
        const newCart = [...this.state.cart];
        const deleteItemIndex = newCart.findIndex(item => item.lineno === deleteItem.lineno);
        newCart.splice(deleteItemIndex, 1);
        newCart.forEach((item, index) => item.lineno = index + 1);
        this.setState(state => state.cart = newCart);
    }
}

BurgerPage.propTypes = {
    data: PropTypes.arrayOf(ingredientType)
}

export default BurgerPage;
