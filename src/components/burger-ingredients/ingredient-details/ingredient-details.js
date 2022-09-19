import CommonStyles from '../../../styles/common.module.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../spinner/spinner";
import commonStyles from "../../../styles/common.module.css";
import React from "react";
import {getIngredients} from "../../../services/actions/ingredients";

export default function IngredientDetails() {
    const dispatch = useDispatch();
    let ingredient = null;
    const { id: ingredientId } = useParams();
    const { loading, items } = useSelector(store => store.ingredients);
    const ingredientIndex = items.findIndex(item => item._id === ingredientId);

    if (ingredientIndex >= 0) {
        ingredient = items[ingredientIndex];
    }

    let content = <Spinner />;
    if (ingredient) {
        content = <div className={`${CommonStyles.flexColumn} ${CommonStyles.flexJCCenter}`}>
            <span className={`text_type_main-medium ${CommonStyles.textCenter}`}>Детали ингредиента</span>
            <img alt='' src={ingredient.image}/>
            <span className={`mt-4 text text_type_main-default ${CommonStyles.textCenter}`}>{ingredient.name}</span>
            <div className={`mt-8 ${CommonStyles.flexRow} ${CommonStyles.flexJCBetween}`}>
                <div
                    className={`text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Калории, ккал</span>
                    <span className={`mt-2`}>{ingredient.calories}</span>
                </div>
                <div
                    className={`ml-5 text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Белки, г</span>
                    <span className={`mt-2`}>{ingredient.proteins}</span>
                </div>
                <div
                    className={`ml-5 text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Жиры, г</span>
                    <span className={`mt-2`}>{ingredient.fat}</span>
                </div>
                <div
                    className={`ml-5 text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Углеводы, г</span>
                    <span className={`mt-2`}>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>;
    } else {
        if (!loading) {
            dispatch(getIngredients());
        }
    }

    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
            {content}
        </section>
    );
}
