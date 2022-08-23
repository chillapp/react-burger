import React from "react";
import IconButton from "../../icon-button/icon-button";
import styles from './burger-constructor-item.module.css';
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../../utils/types";
import {useDispatch, useSelector} from "react-redux";
import {ConstructorDel, ConstructorReplace} from "../../../services/actions/constructor";
import {useDrag, useDrop} from "react-dnd";

export default function BurgerConstructorItem({ cartItem }) {
    const dispatch = useDispatch();

    const { items: cart } = useSelector(store => store.constructor);

    const removeFromCart = () => dispatch(ConstructorDel(cartItem));

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient_move',
        item: { ...cartItem },
        collect: monitor => ({
            opacity: monitor.isDragging() ? .5 : 1
        })
    });

    const [{ isHover, dropItem }, dropRef] = useDrop({
        accept: 'ingredient_move',
        drop(item) {
            const payload = { dragItem: item, dropItem: cartItem };
            dispatch(ConstructorReplace(payload))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            dropItem: monitor.getItem()
        })
    });

    let dropToTop = 'none', dropToBottom = 'none';
    if (isHover && dropItem.uuid !== cartItem.uuid) {
        const dropIndex = cart.findIndex(item => item.uuid === dropItem.uuid);
        const dragIndex = cart.findIndex(item => item.uuid === cartItem.uuid);
        if (dropIndex >= dragIndex) {
            dropToTop = 'block';
        } else {
            dropToBottom = 'block';
        }
    }

    return (
        <li ref={dropRef}>
            <div className={styles.canDragUp} style={{display: dropToTop}}></div>
            <div style={{opacity: opacity}} className={`${commonStyles.flexRow} ${commonStyles.flexFill} ${commonStyles.flexAICenter} mt-4`}>
                <div draggable ref={dragRef} className={styles.dragPointer}>
                    <DragIcon type='primary'/>
                </div>
                <div className={`pt-4 pb-4 pr-8 pl-6 mr-2 ml-2 ${styles.item} ${commonStyles.flexFill}`}>
                    <img alt='' className={styles.smallImage} src={cartItem.image}/>
                    <span className={`text text_type_main-default ml-5 ${commonStyles.flexFill}`}>{cartItem.name}</span>
                    <span className='ml-5 mr-1 text text_type_digits-default'>{cartItem.price}</span>
                    <CurrencyIcon type='primary'/>
                    <div className='pl-5'>
                        <IconButton icon='delete' click={removeFromCart}/>
                    </div>
                </div>
            </div>
            <div className={styles.canDragDown} style={{display: dropToBottom}}></div>
        </li>
    );
}

BurgerConstructorItem.propTypes = {
    cartItem: ingredientType.isRequired,
}
