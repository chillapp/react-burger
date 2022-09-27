import React, {FC, ReactNode} from "react";
import styles from './icon-button.module.css'
import {ListIcon, ProfileIcon, BurgerIcon, DeleteIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

interface IIconButton {
    icon: string
    navLink?: string
    click?: () => void
    children?: ReactNode
}

export const IconButton: FC<IIconButton> = ({ icon, navLink, click, children }) => {

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

    if (navLink) {
        return (
            <NavLink exact={navLink === '/'} activeClassName={styles.active} to={navLink} className={`${styles.iconButton} text_color_inactive`}>
                {getIcon()}
                <span className="text text_type_main-default">{children}</span>
            </NavLink>
        );
    } else {
        return (
            <button className={`${styles.iconButton} text_color_inactive`} onClick={click}>
                {getIcon()}
                <span className="text text_type_main-default">{children}</span>
            </button>
        );
    }


}

IconButton.propTypes = {
    navLink: PropTypes.string,
    icon: PropTypes.string.isRequired,
    click: PropTypes.func
}
