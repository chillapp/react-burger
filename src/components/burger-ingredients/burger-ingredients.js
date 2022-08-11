import React from "react";
import PropTypes from 'prop-types';
import commonStyles from '../../styles/common.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item.js";
import ingredientType from "../../utils/types";

export default function BurgerIngredients({ data, cart, addToCart }) {
    const [currentTab, setCurrentTab] = React.useState('one');

    const renderBun = () => {
        const buns = data.filter(item => item.type === 'bun');
        return (
            <>
                <div id='goto-one' className='text text_type_main-medium pt-10 mb-6'>Булки</div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexWrap} ${commonStyles.flexJCCenter}`}>
                    {
                        buns.map(item =>
                            <BurgerIngredientsItem
                                addToCart={addToCart}
                                key={item._id}
                                data={item}
                                selected={cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }

    const renderSauce = () => {
        const sauces = data.filter(item => item.type === 'sauce');
        return (
            <>
                <div id='goto-two' className='text text_type_main-medium pt-10 mb-6'>Соусы</div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexWrap} ${commonStyles.flexJCCenter}`}>
                    {
                        sauces.map(item =>
                            <BurgerIngredientsItem
                                addToCart={addToCart}
                                key={item._id}
                                data={item}
                                selected={cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }

    const renderMain = () => {
        const mains = data.filter(item => item.type === 'main');
        return (
            <>
                <div id='goto-three' className='text text_type_main-medium pt-10 mb-6'>Начинки</div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexWrap} ${commonStyles.flexJCCenter}`}>
                    {
                        mains.map(item =>
                            <BurgerIngredientsItem
                                data={item}
                                key={item._id}
                                addToCart={addToCart}
                                selected={cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }

    return (
        <section style={{ maxWidth: '600px' }} className={`pt-10 ${commonStyles.flexColumn} ${commonStyles.flexFill}`}>
            <span className='text text_type_main-large'>Соберите бургер</span>
            <div className={`pt-5 ${commonStyles.flexRow} ${commonStyles.flexFill}`}>
                <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value="three" active={currentTab === 'three'} onClick={setCurrentTab}>
                    Начинки
                </Tab>
            </div>
            <section className={`scrollerY`}>
                {renderBun()}
                {renderSauce()}
                {renderMain()}
            </section>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType),
    cart: PropTypes.arrayOf(ingredientType),
    addToCart: PropTypes.func.isRequired
}
