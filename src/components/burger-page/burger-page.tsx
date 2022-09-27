import React, {FC} from "react";
import commonStyles from "../../styles/common.module.css";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {Spinner} from "../spinner/spinner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {IIngredients, IStore} from "../../services/store";
import {AnyAction} from "redux";

export const BurgerPage: FC = () => {
    const { loading, success } = useSelector<IStore>(store => store.ingredients) as IIngredients;

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getIngredients() as AnyAction)
    },[dispatch]);

    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter} ${commonStyles.page} pb-4`}>
            {
                loading
                ? <Spinner extraClass={`${commonStyles.flexItemASCenter}`} />
                : success
                    ? (
                        <>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients/>
                                <BurgerConstructor/>
                            </DndProvider>
                        </>
                    )
                    : <span>Ошибка получения списка ингредиентов :(</span>
            }
        </section>
    );
}
