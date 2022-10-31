import React, {FC, useCallback} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients-item.module.css';
import CommonStyles from '../../../styles/common.module.css';
import {useDrag} from "react-dnd";
import {useHistory, useLocation} from "react-router-dom";
import {TIngredient} from "../../../redux/types/ingredients";

export const BurgerIngredientsItem: FC<{ data: TIngredient, selected: number }> = ({ data, selected }) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...data },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const history = useHistory();
    const location = useLocation();

    const showDetails = useCallback(() => {
        history.replace({
            pathname: `ingredients/${data._id}`,
            state: { background: location }
        });
    }, [data._id, history, location])

    return (
        <>
            <div draggable ref={dragRef} style={{ opacity: opacity }} className={styles.item} onClick={showDetails}>
                {selected > 0 ? <Counter count={selected}/> : null}
                <div className={styles.image}>
                    <img src={data.image}  alt=''/>
                </div>
                <div className={styles.price}>
                    <span className='pr-3 text text_type_digits-default'>{data.price}</span>
                    <CurrencyIcon type='primary'/>
                </div>
                <div className={`${CommonStyles.flexRow} ${CommonStyles.flexAICenter}`}>
                    <span className={`${styles.name} pt-1`}>{data.name}</span>
                </div>
            </div>
        </>
    )
}
