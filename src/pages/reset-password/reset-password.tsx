import React, {FC, useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {authUser, resetPassword} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction} from "redux";
import {IAuth, IStore} from "../../services/store";

export interface IResetPasswordPayload {
    token: string
    password: string
}

export const ResetPasswordPage: FC = () => {
    const dispatch = useDispatch();

    const [newPwd, setNewPwd] = useState<string>("");
    const [emailCode, setEmailCode] = useState<string>("");
    const [pwdType, setPwdType] = useState<"password" | "text">("password");

    const showPassword = () => {
        setPwdType(pwdType === "password" ? "text" : "password")
    }

    useEffect(() => {
        dispatch(authUser() as AnyAction);
    }, []);

    const authState = useSelector<IStore>(store => store.auth) as IAuth;

    const resetPasswordCallback = useCallback(() => {
        const payload: IResetPasswordPayload = {
            password: newPwd,
            token: emailCode
        }
        dispatch(resetPassword(payload) as AnyAction);
    }, [emailCode, newPwd]);

    if (authState.user) {
        return <Redirect to="/" />;
    }

    if (authState.resetPassword.success && authState.resetPassword.error === null) {
        return <Redirect to="/login" />;
    }

    // @ts-ignore
    // @ts-ignore
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
                        disabled={authState.resetPassword.request}
                        value={newPwd}
                        type={pwdType}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setNewPwd(e.target.value)}
                        icon={'ShowIcon'}
                        onIconClick={showPassword}
                    />
                </div>
                <div className={`mt-6`}>
                    <Input
                        disabled={authState.resetPassword.request}
                        value={emailCode}
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setEmailCode(e.target.value)}
                    />
                </div>
                {authState.resetPassword.error && <span className='text_type_main-small text_color_error mt-6'>{authState.resetPassword.error}</span>}
                <div className={`mt-6`}>
                    {/*@ts-ignore*/}
                    <Button disabled={authState.resetPassword.request} onClick={resetPasswordCallback}>Восстановить</Button>
                </div>
                <div className={`mt-20`}>
                    <span className={`text_type_main-default text_color_inactive`}>Вспомнили пароль? </span>
                    <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
                </div>
            </section>
        </>
    );
}
