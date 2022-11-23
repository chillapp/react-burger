import React, {FC, FormEvent, useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "../../redux/hooks";
import {TResetPasswordRequest} from "../../redux/types/user";
import {userAuthThunk, userResetPasswordThunk} from "../../redux/actions/user";
import {useForm} from "../../hooks/useForm";

export interface IResetPasswordPayload {
    token: string
    password: string
}

export const ResetPasswordPage: FC = () => {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm({});

    const [pwdType, setPwdType] = useState<"password" | "text">("password");

    const showPassword = () => {
        setPwdType(pwdType === "password" ? "text" : "password")
    }

    useEffect(() => {
        dispatch(userAuthThunk());
    }, [dispatch]);

    const {
        user,
        userResetPasswordRequest,
        userResetPasswordFailure,
        userResetPasswordSuccess
    } = useSelector(store => store.user);

    const resetPasswordCallback = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const payload: TResetPasswordRequest = {
            password: values.newPwd,
            token: values.emailCode
        }
        dispatch(userResetPasswordThunk(payload));
    }, [dispatch, values]);

    if (user) {
        return <Redirect to="/" />;
    }

    if (userResetPasswordSuccess) {
        return <Redirect to="/login" />;
    }

    return (
        <form className={`
            ${CommonStyles.flexColumn} 
            ${CommonStyles.flexAICenter} 
            ${CommonStyles.flexJCCenter} 
            ${CommonStyles.flexFill}
        `} onSubmit={resetPasswordCallback}>
            <span className={`text_type_main-default text_color_primary`}>Восстановление пароля</span>
            <div className={`mt-6`}>
                <Input
                    name="newPwd"
                    disabled={userResetPasswordRequest}
                    value={values.newPwd || ""}
                    type={pwdType}
                    placeholder={'Введите новый пароль'}
                    onChange={handleChange}
                    icon={'ShowIcon'}
                    onIconClick={showPassword}
                />
            </div>
            <div className={`mt-6`}>
                <Input
                    name="emailCode"
                    disabled={userResetPasswordRequest}
                    value={values.emailCode}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                />
            </div>
            {userResetPasswordFailure && <span className='text_type_main-small text_color_error mt-6'>Ошибка смены пароля</span>}
            <div className={`mt-6`}>
                <Button htmlType="submit" disabled={userResetPasswordRequest}>Восстановить</Button>
            </div>
            <div className={`mt-20`}>
                <span className={`text_type_main-default text_color_inactive`}>Вспомнили пароль? </span>
                <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
            </div>
        </form>
    );
}
