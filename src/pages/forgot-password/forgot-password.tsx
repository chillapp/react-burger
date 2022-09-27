import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useCallback, useEffect, useState} from "react";
import {authUser, forgotPassword} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {AnyAction} from "redux";
import {IAuth, IStore} from "../../services/store";

export const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const authState = useSelector<IStore>(store => store.auth) as IAuth;

    useEffect(() => {
        dispatch(authUser() as AnyAction);
    }, []);

    const reqForgotPassword = useCallback(() => {
        dispatch(forgotPassword(email) as AnyAction);
    }, [dispatch, email]);

    if (authState.user) {
        return <Redirect to="/" />;
    }

    if (authState.forgotPassword.success && !authState.forgotPassword.error) {
        return <Redirect push to="/reset-password" />;
    }

    return (
        <>
            <section className={`
                ${CommonStyles.flexColumn} 
                ${CommonStyles.flexAICenter} 
                ${CommonStyles.flexJCCenter} 
                ${CommonStyles.flexFill}
            `}>
                <span className={`text_type_main-default text_color_primary`}>Восстановление пароля</span>
                <div className={`mt-6`}>
                    <Input
                        disabled={authState.forgotPassword.request}
                        value={email}
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={`mt-6`}>
                    {/*@ts-ignore*/}
                    <Button disabled={authState.forgotPassword.request} onClick={reqForgotPassword}>Восстановить</Button>
                </div>
                <div className={`mt-20`}>
                    <span className={`text_type_main-default text_color_inactive`}>Вспомнили пароль?</span>
                    <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
                </div>
            </section>
        </>
    );
}
