import React from "react";
import PropTypes from 'prop-types';
import commonStyles from '../../styles/common.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsItem from "./burger-ingridients-item/burger-ingridients-item";

class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'one',
        }
    }

    render() {

        return (
            <section style={{ maxWidth: '600px' }} className={`pt-10 ${commonStyles.flexColumn} ${commonStyles.flexFill}`}>
                <span className='text text_type_main-large'>Соберите бургер</span>
                <div className={`pt-5 ${commonStyles.flexRow} ${commonStyles.flexFill}`}>
                    <Tab value="one" active={this.state.current === 'one'} onClick={this.setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={this.state.current === 'two'} onClick={this.setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={this.state.current === 'three'} onClick={this.setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <section className={`scrollerY`}>
                    {this.renderBun()}
                    {this.renderSauce()}
                    {this.renderMain()}
                </section>
            </section>
        )
    }

    setCurrent = (value) => {
        this.setState({current: value});
        this.executeScroll(value);
    }

    executeScroll = (value) => {
        const el = document.getElementById(`goto-${value}`);
        el.scrollIntoView();
    }

    renderBun = () => {
        const { addToCart } = this.props;
        const buns = this.props.data.filter(item => item.type === 'bun');
        return (
            <>
                <div id='goto-one' className='text text_type_main-medium pt-10 mb-6'>Булки</div>
                <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center"}}>
                    {
                        buns.map(item =>
                            <BurgerIngridientsItem
                                addToCart={addToCart}
                                key={item._id}
                                data={item}
                                selected={this.props.cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }

    renderSauce = () => {
        const { addToCart } = this.props;
        const sauces = this.props.data.filter(item => item.type === 'sauce');
        return (
            <>
                <div id='goto-two' className='text text_type_main-medium pt-10 mb-6'>Соусы</div>
                <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center"}}>
                    {
                        sauces.map(item =>
                            <BurgerIngridientsItem
                                addToCart={addToCart}
                                key={item._id}
                                data={item}
                                selected={this.props.cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }

    renderMain = () => {
        const { addToCart } = this.props;
        const mains = this.props.data.filter(item => item.type === 'main');
        return (
            <>
                <div id='goto-three' className='text text_type_main-medium pt-10 mb-6'>Начинки</div>
                <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: "center"}}>
                    {
                        mains.map(item =>
                            <BurgerIngridientsItem
                                data={item}
                                key={item._id}
                                addToCart={addToCart}
                                selected={this.props.cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(BurgerIngridientsItem.propTypes.data),
    cart: PropTypes.arrayOf(BurgerIngridientsItem.propTypes.data),
    addToCart: PropTypes.func.isRequired
}

export default BurgerIngredients;
