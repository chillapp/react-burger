import React from "react";
import IconButton from "../../icon-button/icon-button";
import styles from './burger-constructor-item.module.css';
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


class BurgerConstructorItem extends React.Component {
    render() {
        const {cartItem, deleteItem} = this.props;
        return (
            <div className={`${commonStyles.flexRow} ${commonStyles.flexAICenter} pt-4`}>
                <DragIcon />
                <div className={`pt-4 pb-4 pr-8 pl-6 mr-2 ${styles.item} ${commonStyles.flexFill}`}>
                    <img alt='' className={styles.smallImage} src={cartItem.image}/>
                    <span className='text text_type_main-default ml-5' style={{flex: '1'}}>{cartItem.name}</span>
                    <span className='ml-5 mr-1 text text_type_digits-default'>{cartItem.price}</span>
                    <CurrencyIcon type='primary'/>
                    <div className='pl-5'>
                        <IconButton icon='delete' click={deleteItem.bind(this, cartItem)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BurgerConstructorItem;
