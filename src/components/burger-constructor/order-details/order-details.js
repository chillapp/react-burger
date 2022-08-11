import CommonStyles from '../../../styles/common.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails({ cart }) {
    return (
        <div className={`${CommonStyles.flexColumn}`}>
            <span className={`text text_type_digits-large ${CommonStyles.textCenter}`}>034536</span>
            <span className={`text text_type_main-default ${CommonStyles.textCenter}`}>идентификатор заказа</span>
            <div className={`pt-15 pb-15 ${CommonStyles.textCenter}`}>
                <CheckMarkIcon type={"primary"}/>
            </div>
            <span className={`text text_type_main-small ${CommonStyles.textCenter}`}>Ваш заказ начали готовить</span>
            <span className={`mt-2 text text_color_inactive text_type_main-small ${CommonStyles.textCenter}`}>Дождитесь готовности на орбитальной станции</span>
        </div>
    );
}
