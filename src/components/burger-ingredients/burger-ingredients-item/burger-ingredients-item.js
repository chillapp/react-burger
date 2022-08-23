import React from "react";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, InfoIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css';
import CommonStyles from '../../../styles/common.module.css';
import ingredientType from "../../../utils/types";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch} from "react-redux";
import {ConstructorAdd} from "../../../services/actions/constructor";
import {useDrag} from "react-dnd";

export default function BurgerIngredientsItem({ data, selected }) {
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...data },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const dispatch = useDispatch();

    const [detailsModal, setDetailsModal] = React.useState(false);

    const showDetails = e => {
        e.preventDefault();
        e.stopPropagation();
        setDetailsModal(true);
    }
    const hideDetails = () => setDetailsModal(false);

    const addToCart = () => dispatch(ConstructorAdd(data));

    return (
        <>
            <div draggable ref={dragRef} style={{ opacity: opacity }} className={styles.item} onClick={addToCart}>
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
    selected: PropTypes.number.isRequired
}
