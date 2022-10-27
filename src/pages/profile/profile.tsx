import {NavLink, Switch, Route, Redirect, useLocation} from "react-router-dom";
import styles from "./profile.module.css";
import commonStyles from "../../styles/common.module.css"
import {ProfileProfilePage} from "./profile/profile";
import {ProfileOrdersPage} from "./orders/orders";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../services/actions/auth";
import {IAuth, IStore} from "../../services/store";
import {AnyAction} from "redux";

export default function ProfilePage() {
    const dispatch = useDispatch();

    const authState = useSelector<IStore>(store => store.auth) as IAuth;

    const location = useLocation();

    const pathParts = location.pathname.split('/');


    if (!authState.user && authState.logoutUser.success) {
        return <Redirect to="/login"/>;
    }

    const logout = () => {
        dispatch(logoutUser() as AnyAction);
    }

    return (
        <section className={`${commonStyles.flexRow} ${commonStyles.flexJCCenter}`}>
            <div className={`${styles.content} ${commonStyles.flexRow}`}>
                {pathParts.length !== 4 && <div className={`mr-15 ${styles.menuContent}`}>
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
                                    История заказов
                                </span>
                            </NavLink>
                        </li>
                        <li onClick={logout} className={`p-2 pl-0 ${commonStyles.cursorPointer}`}>
                            <span className={`text_type_main-medium text_color_inactive`}>
                                Выход
                            </span>
                        </li>
                    </ul>
                </div>}
                <div className={`${commonStyles.flexFill} pt-6`}>
                    <Switch>
                        <Route exact path='/profile' component={ProfileProfilePage} />
                        <Route exact path='/profile/orders' component={ProfileOrdersPage} />
                        <Route exact path='/profile/orders/:id' component={ProfileOrdersPage} />
                    </Switch>
                </div>
            </div>
        </section>
    );
}
