import React from 'react';
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

export const getApiUrl = (endpoint: string): string => `https://norma.nomoreparties.space/api/${endpoint}`;

interface ILocationState {
    background: H.Location
}

export default function App() {
    const ModalSwitch = () => {
        const location = useLocation<ILocationState>();
        const history = useHistory();

        let background = location.state && location.state.background;

        const handleModalClose = () => {
            history.replace('/');
        };

        return (
            <>
                <AppHeader/>
                <Switch location={background || location}>
                    <Route exact path='/' component={BurgerPage}/>
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
                            <Modal header={""} onClose={handleModalClose}>
                                <IngredientDetails />
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
