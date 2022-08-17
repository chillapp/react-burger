import CommonStyles from '../../../styles/common.module.css'
import ingredientType from "../../../utils/types";

export default function IngredientDetails({ ingredient }) {
    return (
        <div className={`${CommonStyles.flexColumn} ${CommonStyles.flexJCCenter}`}>
            <img alt='' src={ingredient.image} />
            <span className={`mt-4 text text_type_main-default ${CommonStyles.textCenter}`}>{ingredient.name}</span>
            <div className={`mt-8 ${CommonStyles.flexRow} ${CommonStyles.flexJCBetween}`}>
                <div className={`text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Калории, ккал</span>
                    <span className={`mt-2`}>{ingredient.calories}</span>
                </div>
                <div className={`ml-5 text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Белки, г</span>
                    <span className={`mt-2`}>{ingredient.proteins}</span>
                </div>
                <div className={`ml-5 text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Жиры, г</span>
                    <span className={`mt-2`}>{ingredient.fat}</span>
                </div>
                <div className={`ml-5 text text_type_main-small text_color_inactive ${CommonStyles.flexColumn} ${CommonStyles.flexAICenter}`}>
                    <span>Углеводы, г</span>
                    <span className={`mt-2`}>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired,
}
