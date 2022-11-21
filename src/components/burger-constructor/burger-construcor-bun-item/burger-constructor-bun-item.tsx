import React, {FC} from "react";
import styles from './burger-constructor-bun-item.module.css';
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../../redux/types/ingredients";

export const BurgerConstructorBunItem: FC<{ role: "top" | "bottom", bun?: TIngredient }> = ({ role, bun }) => {
    return (
        <div className={`${commonStyles.flexRow} ${commonStyles.flexAICenter} pl-8`}>
            <div className={
                `pt-4 pb-4 pr-8 pl-6 mr-4
                    ${commonStyles.panelColor}
                    ${commonStyles.flexRow}
                    ${commonStyles.flexAICenter}
                    ${commonStyles.flexFill}
                    ${role === 'top' ? styles.itemTop : styles.itemBottom}`
            }>
                <img style={{display: bun ? 'unset' : 'none'}} alt='' className={styles.smallImage} src={bun && bun.image}/>
                <span className={`text text_type_main-default ml-5 ${commonStyles.flexFill}`}>{bun ? bun.name : 'выберите булку'}{role === 'top' ? ' (верх)' : ' (низ)'}</span>
                <span className='ml-5 mr-1 text text_type_digits-default'>{bun ? bun.price / 2 : 0}</span>
                <CurrencyIcon type='primary'/>
                <div className='pl-5'>
                    <LockIcon type='secondary'/>
                </div>
            </div>
        </div>
    );
}
