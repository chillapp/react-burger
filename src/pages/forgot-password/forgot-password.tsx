import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, FormEvent, useCallback, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "../../redux/hooks";
import {userForgotPasswordThunk} from "../../redux/actions/user";

export const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const {
        user,
        userForgotPasswordRequest,
        userForgotPasswordSuccess
    } = useSelector(store => store.user);

    useEffect(() => {
        //dispatch(authUser() as AnyAction);
    }, []);

    const reqForgotPassword = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(userForgotPasswordThunk(email));
    }, [dispatch, email]);

    if (user) {
        return <Redirect to="/" />;
    }

    if (userForgotPasswordSuccess) {
        return <Redirect push to="/reset-password" />;
    }

    return (
        <form className={`
            ${CommonStyles.flexColumn} 
            ${CommonStyles.flexAICenter} 
            ${CommonStyles.flexJCCenter} 
            ${CommonStyles.flexFill}
        `} onSubmit={reqForgotPassword}>
            <span className={`text_type_main-default text_color_primary`}>Восстановление пароля</span>
            <div className={`mt-6`}>
                <Input
                    disabled={userForgotPasswordRequest}
                    value={email}
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className={`mt-6`}>
                <Button htmlType="submit" disabled={userForgotPasswordRequest}>Восстановить</Button>
            </div>
            <div className={`mt-20`}>
                <span className={`text_type_main-default text_color_inactive`}>Вспомнили пароль?</span>
                <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
            </div>
        </form>
    );
}
