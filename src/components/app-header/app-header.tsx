import React from "react";
import styles from './app-header.module.css';
import commonStyles from '../../styles/common.module.css';
import {
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {IconButton} from "../icon-button/icon-button";
import {NavLink} from "react-router-dom";

export default function AppHeader() {
    return (
        <header className={`p-4 ${commonStyles.panelColor} ${commonStyles.flexRow} ${commonStyles.flexJCAround}`}>
            <NavLink to="/" className={`${styles.logoCentering}`}>
                <Logo />
            </NavLink>
            <section className={commonStyles.flexRow}>
                <IconButton navLink='/' icon='burger'>Конструктор</IconButton>
                <IconButton navLink='/feed' icon='list'>Лента заказов</IconButton>
            </section>
            <IconButton navLink='/profile' icon='profile'>Личный кабинет</IconButton>
        </header>
    );
}
