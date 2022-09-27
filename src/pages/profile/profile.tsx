import {NavLink, Switch, Route, Redirect} from "react-router-dom";
import styles from "./profile.module.css";
import commonStyles from "../../styles/common.module.css"
import {ProfileProfilePage} from "./profile/profile";
import {ProfileOrdersPage} from "./orders/orders";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../services/actions/auth";
import {IAuth, IStore} from "../../services/store";
import {AnyAction} from "redux";

export default function ProfilePage() {
    const dispatch = useDispatch();

    const authState = useSelector<IStore>(store => store.auth) as IAuth;

    if (!authState.user && authState.logoutUser.success) {
        return <Redirect to="/login"/>;
    }

    const logout = () => {
        dispatch(logoutUser() as AnyAction);
    }
    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter}`}>
            <div className={`${styles.content} ${commonStyles.flexRow}`}>
                <div className={`mr-15`}>
                    <ul className={styles.profileMenu}>
                        <li className={`p-2 pl-0`}>
                            <NavLink exact activeClassName={styles.profileMenuItemActive} to="/profile">
                                <span className={`text_type_main-medium text_color_inactive`}>
                                    Профиль
                                </span>
                            </NavLink>
                        </li>
                        <li className={`p-2 pl-0`}>
                            <NavLink activeClassName={styles.profileMenuItemActive} to="/profile/orders">
                                <span className={`text_type_main-medium text_color_inactive`}>
                                    Заказы
                                </span>
                            </NavLink>
                        </li>
                        <li className={`p-2 pl-0`}>
                            <span className={`text_type_main-medium text_color_primary`}>
                                {/*@ts-ignore*/}
                                <Button type='secondary' size='large' onClick={logout}>Выход</Button>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className={`${commonStyles.flexFill} pt-6`}>
                    <Switch>
                        <Route exact path='/profile' component={ProfileProfilePage} />
                        <Route path='/profile/orders' component={ProfileOrdersPage} />
                    </Switch>
                </div>
            </div>
        </section>
    );
}
