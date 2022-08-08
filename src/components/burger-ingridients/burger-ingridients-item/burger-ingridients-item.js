import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingridients-item.module.css';


class BurgerIngridientsItem extends React.Component {
    render() {
        const { data: item, addToCart, selected } = this.props;
        return (
            <div className={styles.item} onClick={addToCart.bind(this, item)}>
                {selected > 0 ? <Counter count={selected}/> : null}
                <div className={styles.image}>
                    <img src={item.image}  alt=''/>
                </div>
                <div className={styles.price}>
                    <span className='pr-3 text text_type_digits-default'>{item.price}</span>
                    <CurrencyIcon type='primary'/>
                </div>
                <span className={`${styles.name} pt-1`}>{item.name}</span>
            </div>
        )
    }
}

BurgerIngridientsItem.propTypes = {
    data: PropTypes.shape({
        "_id": PropTypes.string,
        "name": PropTypes.string,
        "type": PropTypes.oneOf(['bun', 'sauce', 'main']),
        "proteins": PropTypes.number,
        "fat": PropTypes.number,
        "carbohydrates": PropTypes.number,
        "calories": PropTypes.number,
        "price": PropTypes.number,
        "image": PropTypes.string,
        "image_mobile": PropTypes.string,
        "image_large": PropTypes.string,
        "__v": PropTypes.number
    }).isRequired,
    addToCart: PropTypes.func,
    selected: PropTypes.number
}

export default BurgerIngridientsItem;
