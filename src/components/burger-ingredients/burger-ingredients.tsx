import React, {FC} from "react";
import commonStyles from '../../styles/common.module.css';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerIngredientsItem} from "./burger-ingredients-item/burger-ingredients-item";
import {useDispatch, useSelector} from "../../redux/hooks";
import {ingredientsSetTab} from "../../redux/actions/ingredients";

export const BurgerIngredients: FC = () => {
    const dispatch = useDispatch();

    const { rows: data, ingredientsTab } = useSelector(store => store.ingredients)
    const { cart } = useSelector(store => store.burgerConstructor);

    const tabClick = (tab: string, elRef: React.RefObject<HTMLDivElement>) => {
        dispatch(ingredientsSetTab(tab));
        elRef.current && elRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const bunsRef = React.useRef<HTMLDivElement>(null);
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
    }, [cart, data]);

    const saucesRef = React.useRef<HTMLDivElement>(null);
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
    }, [cart, data]);

    const mainsRef = React.useRef<HTMLDivElement>(null);
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
    }, [cart, data]);


    let scrollEndTimeOut: NodeJS.Timeout | null = null;
    const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (scrollEndTimeOut) clearTimeout(scrollEndTimeOut);
        scrollEndTimeOut = setTimeout(() => scrollEndHandler(event), 20);
    }

    const scrollEndHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const tabs = ['bun', 'sauce', 'main'];

        const scrollContainer = e.target as HTMLDivElement;
        const containerRect = scrollContainer.getBoundingClientRect();

        const values = [];

        if (!bunsRef.current) return;
        const bunsRect = bunsRef.current.getBoundingClientRect();
        const bunsY = Math.abs(bunsRect.y - containerRect.y);
        values.push(bunsY);

        if (!saucesRef.current) return;
        const saucesRect = saucesRef.current.getBoundingClientRect();
        const saucesY = Math.abs(saucesRect.y - containerRect.y);
        values.push(saucesY);

        if (!mainsRef.current) return;
        const mainsRect = mainsRef.current.getBoundingClientRect();
        const mainsY = Math.abs(mainsRect.y - containerRect.y);
        values.push(mainsY);

        const minValue = Math.min(...values);
        const minIndex = values.indexOf(minValue);

        if (ingredientsTab !== tabs[minIndex]) {
        }
    }


    return (
        <section className={`pt-10 ${styles.content} ${commonStyles.flexColumn} ${commonStyles.flexFill}`}>
            <span className='text text_type_main-large'>Соберите бургер</span>
            <div className={`pt-5 ${commonStyles.flexRow} ${commonStyles.flexFill}`}>
                <Tab
                    value="bun"
                    active={ingredientsTab === 'bun'}
                    onClick={(tab) => tabClick(tab, bunsRef)}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={ingredientsTab === 'sauce'}
                    onClick={(tab) => tabClick(tab, saucesRef)}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={ingredientsTab === 'main'}
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
