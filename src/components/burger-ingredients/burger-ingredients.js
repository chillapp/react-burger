import React, {useCallback} from "react";
import commonStyles from '../../styles/common.module.css';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item.js";
import {useDispatch, useSelector} from "react-redux";
import {IngredientsSetTab} from "../../services/actions/ingredients";

export default function BurgerIngredients() {
    const dispatch = useDispatch();

    const { items: data, currentTab } = useSelector(store => store.ingredients);

    const { items: cart } = useSelector(store => store.constructor);

    const tabClick = (tab, elRef) => {
        dispatch(IngredientsSetTab(tab));
        elRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const bunsRef = React.useRef(null);
    const bunItems = React.useMemo(() => {
        const buns = data.filter(item => item.type === 'bun');
        return (
            <>
                <div ref={bunsRef} className='text text_type_main-medium pt-10 mb-6'>Булки</div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexWrap} ${commonStyles.flexJCCenter}`}>
                    {
                        buns.map(item =>
                            <BurgerIngredientsItem
                                key={item._id}
                                data={item}
                                selected={cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }, [data, cart]);

    const saucesRef = React.useRef(null);
    const sauceItems = React.useMemo(() => {
        const sauces = data.filter(item => item.type === 'sauce');
        return (
            <>
                <div ref={saucesRef} className='text text_type_main-medium pt-10 mb-6'>Соусы</div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexWrap} ${commonStyles.flexJCCenter}`}>
                    {
                        sauces.map(item =>
                            <BurgerIngredientsItem
                                key={item._id}
                                data={item}
                                selected={cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }, [data, cart]);

    const mainsRef = React.useRef(null);
    const mainItems = React.useMemo(() => {
        const mains = data.filter(item => item.type === 'main');
        return (
            <>
                <div ref={mainsRef} className='text text_type_main-medium pt-10 mb-6'>Начинки</div>
                <div className={`${commonStyles.flexRow} ${commonStyles.flexWrap} ${commonStyles.flexJCCenter}`}>
                    {
                        mains.map(item =>
                            <BurgerIngredientsItem
                                data={item}
                                key={item._id}
                                selected={cart.filter(cartItem => cartItem._id === item._id).length}
                            />
                        )
                    }
                </div>
            </>
        )
    }, [data, cart]);


    let scrollEndTimeOut = null;
    const onScroll = (e) => {
        if (scrollEndTimeOut) clearTimeout(scrollEndTimeOut);
        scrollEndTimeOut = setTimeout(() => scrollEndHandler(e), 20);
    }

    const scrollEndHandler = (e) => {
        const tabs = ['one', 'two', 'three'];

        const containerRect = e.target.getBoundingClientRect();

        const values = [];

        const bunsRect = bunsRef.current.getBoundingClientRect();
        const bunsY = Math.abs(parseInt(bunsRect.y - containerRect.y));
        values.push(bunsY);

        const saucesRect = saucesRef.current.getBoundingClientRect();
        const saucesY = Math.abs(parseInt(saucesRect.y - containerRect.y));
        values.push(saucesY);

        const mainsRect = mainsRef.current.getBoundingClientRect();
        const mainsY = Math.abs(parseInt(mainsRect.y - containerRect.y));
        values.push(mainsY);

        const minValue = Math.min(...values);
        const minIndex = values.indexOf(minValue);

        if (currentTab !== tabs[minIndex]) {
            dispatch(IngredientsSetTab(tabs[minIndex]));
        }
    }

    return (
        <section className={`pt-10 ${styles.content} ${commonStyles.flexColumn} ${commonStyles.flexFill}`}>
            <span className='text text_type_main-large'>Соберите бургер</span>
            <div className={`pt-5 ${commonStyles.flexRow} ${commonStyles.flexFill}`}>
                <Tab
                    value="one"
                    active={currentTab === 'one'}
                    onClick={(tab) => tabClick(tab, bunsRef)}
                >
                    Булки
                </Tab>
                <Tab
                    value="two"
                    active={currentTab === 'two'}
                    onClick={(tab) => tabClick(tab, saucesRef)}
                >
                    Соусы
                </Tab>
                <Tab
                    value="three"
                    active={currentTab === 'three'}
                    onClick={(tab) => tabClick(tab, mainsRef)}
                >
                    Начинки
                </Tab>
            </div>
            <section className={`scrollerY`} onScroll={onScroll}>
                { bunItems }
                { sauceItems }
                { mainItems }
            </section>
        </section>
    );
}
