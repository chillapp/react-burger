import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css';
import ingredientType from "../../../utils/types";

export default function BurgerIngredientsItem({ data, addToCart, selected }) {
    return (
        <div className={styles.item} onClick={addToCart.bind(this, data)}>
            {selected > 0 ? <Counter count={selected}/> : null}
            <div className={styles.image}>
                <img src={data.image}  alt=''/>
            </div>
            <div className={styles.price}>
                <span className='pr-3 text text_type_digits-default'>{data.price}</span>
                <CurrencyIcon type='primary'/>
            </div>
            <span className={`${styles.name} pt-1`}>{data.name}</span>
        </div>
    )
}

BurgerIngredientsItem.propTypes = {
    data: ingredientType.isRequired,
    addToCart: PropTypes.func,
    selected: PropTypes.number
}
