import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, InfoIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css';
import CommonStyles from '../../../styles/common.module.css';
import ingredientType from "../../../utils/types";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function BurgerIngredientsItem({ data, addToCart, selected }) {
    const [detailsModal, setDetailsModal] = React.useState(false);
    const showDetails = e => {
        e.preventDefault();
        e.stopPropagation();
        setDetailsModal(true);
    }
    const hideDetails = () => setDetailsModal(false);
    return (
        <>
            <div className={styles.item} onClick={addToCart.bind(this, data)}>
                {selected > 0 ? <Counter count={selected}/> : null}
                <div className={styles.image}>
                    <img src={data.image}  alt=''/>
                </div>
                <div className={styles.price}>
                    <span className='pr-3 text text_type_digits-default'>{data.price}</span>
                    <CurrencyIcon type='primary'/>
                </div>
                <div className={`${CommonStyles.flexRow} ${CommonStyles.flexAICenter}`}>
                    <span className={`${styles.name} pt-1`}>{data.name}</span>
                    <button className={`ml-2 ${CommonStyles.button}`} onClick={showDetails}>
                        <InfoIcon/>
                    </button>
                </div>
            </div>
            {detailsModal && (
                <Modal header='Детали ингредиента' onClose={hideDetails}>
                    <IngredientDetails ingredient={data}/>
                </Modal>
            )}
        </>
    )
}

BurgerIngredientsItem.propTypes = {
    data: ingredientType.isRequired,
    addToCart: PropTypes.func,
    selected: PropTypes.number
}
