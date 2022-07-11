import React from "react";
import styles from './icon-button.module.css'
import {ListIcon, ProfileIcon, BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'

class IconButton extends React.Component {

    render() {
        return (
            <button className={`${styles.iconButton} text_color_inactive`}>
                {this.getIcon()}
                <span className="text text_type_main-default">{this.props.children}</span>
            </button>
        );
    }

    getIcon = () => {
        switch (this.props.icon) {
            case 'burger':
                return <span className="mr-2"><BurgerIcon type='primary'/></span>
            case 'list':
                return <span className="mr-2"><ListIcon type='primary'/></span>
            case 'profile':
                return <span className="mr-2"><ProfileIcon type='primary'/></span>
            default: return '';
        }
    }
}

export default IconButton;
