import React, {FC} from "react";
import styles from "./ingredient-list-item.module.css"
import commonStyles from '../../../styles/common.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../../redux/types/ingredients";


export const IngredientListItem: FC<{ingredient: TIngredient}> = ({ingredient}) => {
    return (
        <li className={`mt-2 ${commonStyles.wFull} ${commonStyles.flexRow} ${commonStyles.flexAICenter} ${commonStyles.flexJCLeft}`}>
            <img className={`${styles.ingredientLogo}`} src={ingredient.image_mobile} alt={""}/>
            <span className={`text text_type_main-default ml-2 ${commonStyles.flexFill}`}>{ingredient.name}</span>
            <span className={`text text_type_digits-default`}>1x{ingredient.price}</span>
            <div className={`ml-2`}>
                <CurrencyIcon type='primary'/>
            </div>
        </li>
    )
}
