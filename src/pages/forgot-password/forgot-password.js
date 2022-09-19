import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useEffect, useState} from "react";
import {authUser, forgotPassword} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const authState = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(authUser());
    }, []);

    const reqForgotPassword = useCallback(() => {
        dispatch(forgotPassword(email));
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
                    <Button disabled={authState.forgotPassword.request} onClick={reqForgotPassword}>Восстановить</Button>
                </div>
                <div className={`mt-20`}>
                    <span className={`text_type_main-default text_color_inactive`}>Вспомнили пароль? </span>
                    <Link disabled={authState.forgotPassword.request} to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
                </div>
            </section>
        </>
    );
}
