import React from "react";
import styles from './app-header.module.css';
import commonStyles from '../../styles/common.module.css';
import {
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'
import IconButton from "../icon-button/icon-button";

class AppHeader extends React.Component {
    render() {
        return (
            <header className={`p-4 ${commonStyles.panelColor}`} style={{position: "relative", display: "flex", justifyContent: "space-around"}}>
                <div className={styles.logoCentering}>
                    <Logo />
                </div>
                <section style={{display: "flex"}}>
                    <IconButton icon='burger'>Конструктор</IconButton>
                    <IconButton icon='list'>Лента заказов</IconButton>
                </section>
                <IconButton icon='profile'>Личный кабинет</IconButton>
            </header>
        );
    }
}

export default AppHeader;
