import React, {FC} from "react";
import commonStyles from "../../styles/common.module.css";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Spinner} from "../spinner/spinner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useSelector} from "../../redux/hooks";

export const BurgerPage: FC = () => {
    const { ingredientsRequest, ingredientsFailure } = useSelector(store => store.ingredients);
    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
            {
                ingredientsRequest
                ? <Spinner extraClass={`${commonStyles.flexItemASCenter}`} />
                : ingredientsFailure
                    ? <span>Ошибка получения списка ингредиентов :(</span>
                    :
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
            }
        </section>
    );
}
