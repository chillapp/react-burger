import React from "react";
import IconButton from "../../icon-button/icon-button";
import styles from './burger-constructor-item.module.css';
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructorItem({cartItem, deleteItem}) {
    return (
        <li className={`${commonStyles.flexRow} ${commonStyles.flexFill} ${commonStyles.flexAICenter} mt-4`}>
            <DragIcon type='primary'/>
            <div className={`pt-4 pb-4 pr-8 pl-6 mr-2 ml-2 ${styles.item} ${commonStyles.flexFill}`}>
                <img alt='' className={styles.smallImage} src={cartItem.image}/>
                <span className={`text text_type_main-default ml-5 ${commonStyles.flexFill}`}>{cartItem.name}</span>
                <span className='ml-5 mr-1 text text_type_digits-default'>{cartItem.price}</span>
                <CurrencyIcon type='primary'/>
                <div className='pl-5'>
                    <IconButton icon='delete' click={deleteItem.bind(this, cartItem)}/>
                </div>
            </div>
        </li>
    );
}
