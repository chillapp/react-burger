import React, {PropsWithChildren, ReactElement} from 'react';
import AppHeader from "../app-header/app-header";
import {BurgerPage} from "../burger-page/burger-page";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {LoginPage} from "../../pages/login/login";
import {RegisterPage} from "../../pages/register/register";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {ProtectedRoute} from "../protected-route/protected-route";
import ProfilePage from "../../pages/profile/profile";
import {Page404} from "../../pages/404/404";
import {IngredientDetails} from "../burger-ingredients/ingredient-details/ingredient-details";
import {Modal} from "../modal/modal";
import * as H from 'history';
import {FeedPage} from "../../pages/feed/feed";
import {FeedOrderDetails} from "../feed-order-details/feed-order-details";
import {useDispatch} from "../../redux/hooks";
import {getIngredientsThunk} from "../../redux/actions/ingredients";

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

interface ILocationState {
    background: H.Location
}

export default function App() {
    const ModalSwitch = () => {
        const location = useLocation<ILocationState>();
        const history = useHistory();

        const background = location.state && location.state.background;

        const handleModalClose = (path: string) => {
            history.replace(path);
        };

        const dispatch = useDispatch();

        React.useEffect(() => {
            dispatch(getIngredientsThunk());
        },[dispatch]);

        return (
            <>
                <AppHeader/>
                <Switch location={background || location}>
                    <Route exact path='/' component={BurgerPage}/>
                    <Route exact path='/feed' component={FeedPage}/>
                    <Route path='/feed/:id' component={FeedPage}/>
                    <ProtectedRoute path='/profile' component={ProfilePage}/>
                    <Route path='/ingredients/:id' component={IngredientDetails}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/forgot-password' component={ForgotPasswordPage}/>
                    <Route path='/reset-password' component={ResetPasswordPage}/>
                    <Route>
                        <Page404></Page404>
                    </Route>
                </Switch>
                {background && (
                    <Route
                        path='/ingredients/:id'
                        children={
                            <Modal header={""} onClose={handleModalClose.bind(null, "/")}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                )}
                {background && (
                    <Route
                        path='/feed/:id'
                        children={
                            <Modal header={""} onClose={handleModalClose.bind(null, "/feed")}>
                                <FeedOrderDetails storeKey="commonFeed" />
                            </Modal>
                        }
                    />
                )}
                {background && (
                    <Route
                        path='/profile/orders/:id'
                        children={
                            <Modal header={""} onClose={handleModalClose.bind(null, "/profile/orders")}>
                                <FeedOrderDetails storeKey="profileFeed" />
                            </Modal>
                        }
                    />
                )}
            </>
        );
    }
    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}
