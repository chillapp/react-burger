import React, {FC} from "react";
import {IconButton} from "../../icon-button/icon-button";
import styles from './burger-constructor-item.module.css';
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch, useSelector} from "../../../redux/hooks";
import {constructorDel, constructorReplace} from "../../../redux/actions/constructor";
import {TConstructorDND} from "../../../redux/types/constructor";
import {TIngredient} from "../../../redux/types/ingredients";

export const BurgerConstructorItem: FC<{ ingredient: TIngredient }> = ({ ingredient }) => {
    const dispatch = useDispatch();

    const { cart } = useSelector(store => store.burgerConstructor);

    const removeFromCart = () => dispatch(constructorDel(ingredient));

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient_move',
        item: { ...ingredient },
        collect: monitor => ({
            opacity: monitor.isDragging() ? .5 : 1
        })
    });

    const [{ isHover, dropItem }, dropRef] = useDrop({
        accept: 'ingredient_move',
        drop(item: TIngredient) {
            const data: TConstructorDND = {
                dragIngredient: item,
                dropIngredient: ingredient
            };
            dispatch(constructorReplace(data))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            dropItem: monitor.getItem()
        })
    });

    let dropToTop = 'none', dropToBottom = 'none';
    if (isHover && dropItem.uuid !== ingredient.uuid) {
        const dropIndex = cart.findIndex(item => item.uuid === dropItem.uuid);
        const dragIndex = cart.findIndex(item => item.uuid === ingredient.uuid);
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
                    <img alt='' className={styles.smallImage} src={ingredient.image}/>
                    <span className={`text text_type_main-default ml-5 ${commonStyles.flexFill}`}>{ingredient.name}</span>
                    <span className='ml-5 mr-1 text text_type_digits-default'>{ingredient.price}</span>
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
