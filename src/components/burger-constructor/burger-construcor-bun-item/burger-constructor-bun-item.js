import React from "react";
import PropTypes from 'prop-types';
import styles from './burger-constructor-bun-item.module.css';
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsItem from "../../burger-ingridients/burger-ingridients-item/burger-ingridients-item";

class BurgerConstructorBunItem extends React.Component {
    render() {
        const {role, bun} = this.props;
        return (
            <div className={`${commonStyles.flexRow} ${commonStyles.flexAICenter} pl-8 ${role === 'bottom' ? 'pt-4' : ''}`}>
                <div className={
                    `pt-4 pb-4 pr-8 pl-6 mr-4
                    ${commonStyles.panelColor}
                    ${commonStyles.flexRow}
                    ${commonStyles.flexAICenter}
                    ${commonStyles.flexFill}
                    ${role === 'top' ? styles.itemTop : styles.itemDown}`
                }>
                    <img alt='' className={styles.smallImage} src={bun.image}/>
                    <span className='text text_type_main-default ml-5' style={{flex: '1'}}>{bun.name}{role === 'top' ? ' (верх)' : ' (низ)'}</span>
                    <span className='ml-5 mr-1 text text_type_digits-default'>{bun.price / 2}</span>
                    <CurrencyIcon type='primary'/>
                    <div className='pl-5'>
                        <LockIcon type='secondary'/>
                    </div>
                </div>
            </div>
        );
    }
}

BurgerConstructorBunItem.propTypes = {
    bun: PropTypes.objectOf(BurgerIngridientsItem.propTypes.data).isRequired,
    role: PropTypes.oneOf(['top', 'bottom']).isRequired
}

export default BurgerConstructorBunItem;
