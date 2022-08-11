import React from "react";
import styles from './icon-button.module.css'
import {ListIcon, ProfileIcon, BurgerIcon, DeleteIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function IconButton({ icon, click, children }) {

    const getIcon = () => {
        switch (icon) {
            case 'burger':
                return <span className="mr-2"><BurgerIcon type='primary'/></span>
            case 'list':
                return <span className="mr-2"><ListIcon type='primary'/></span>
            case 'profile':
                return <span className="mr-2"><ProfileIcon type='primary'/></span>
            case 'delete':
                return <span className="mr-2"><DeleteIcon type='primary'/></span>
            default: return '';
        }
    }

    return (
        <button className={`${styles.iconButton} text_color_inactive`} onClick={click}>
            {getIcon()}
            <span className="text text_type_main-default">{children}</span>
        </button>
    );
}
