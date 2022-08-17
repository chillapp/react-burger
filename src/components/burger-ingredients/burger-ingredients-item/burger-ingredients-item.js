import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, InfoIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css';
import CommonStyles from '../../../styles/common.module.css';
import ingredientType from "../../../utils/types";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {CartContext} from "../../../services/cartContext";

export default function BurgerIngredientsItem({ data, selected }) {
    const [detailsModal, setDetailsModal] = React.useState(false);
    const [, setCart] = React.useContext(CartContext);
    const showDetails = e => {
        e.preventDefault();
        e.stopPropagation();
        setDetailsModal(true);
    }
    const hideDetails = () => setDetailsModal(false);
    return (
        <>
            <div className={styles.item} onClick={setCart.bind(this, {type:'append', payload: data})}>
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
                        <InfoIcon type='primary'/>
                    </button>
                </div>
            </div>
            {detailsModal && (
                <Modal isOpen={detailsModal} header='Детали ингредиента' onClose={hideDetails}>
                    <IngredientDetails ingredient={data}/>
                </Modal>
            )}
        </>
    )
}

BurgerIngredientsItem.propTypes = {
    data: ingredientType.isRequired,
    // addToCart: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired
}
