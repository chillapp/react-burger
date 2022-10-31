import {NavLink, Switch, Route, Redirect, useLocation} from "react-router-dom";
import styles from "./profile.module.css";
import commonStyles from "../../styles/common.module.css"
import {ProfileProfilePage} from "./profile/profile";
import {ProfileOrdersPage} from "./orders/orders";
import {useDispatch, useSelector} from "../../redux/hooks";
import {userLogoutThunk} from "../../redux/actions/user";
import {setCookie} from "../../utils/common";

export default function ProfilePage() {
    const dispatch = useDispatch();

    const { userLogoutSuccess } = useSelector(store => store.user);

    const location = useLocation();

    const pathParts = location.pathname.split('/');

    const logout = () => {
        dispatch(userLogoutThunk());
    }

    if (userLogoutSuccess) {
        localStorage.removeItem("refreshToken");
        setCookie("accessToken", null, { expired: -1 });
        return <Redirect to="/login"/>;
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
