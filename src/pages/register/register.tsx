import React, {FC, FormEvent, useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "../../redux/hooks";
import {userAuthThunk, userRegisterThunk} from "../../redux/actions/user";
import {TUser} from "../../redux/types/user";
import {useForm} from "../../hooks/useForm";

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm({});

    const [pwdType, setPwdType] = useState<"password" | "text">('password');

    useEffect(() => {
        dispatch(userAuthThunk());
    }, [dispatch]);

    const showPassword = () => {
        setPwdType(pwdType === 'password' ? 'text' : 'password')
    }

    const registerUserCallback = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const payload: TUser = {
            email: values.email,
            password: values.password,
            name: values.name
        }
        dispatch(userRegisterThunk(payload));
    }, [values, dispatch])

    const {
        user,
        userRegisterRequest,
        userRegisterFailure
    } = useSelector(store => store.user);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form className={`
            ${CommonStyles.flexColumn} 
            ${CommonStyles.flexAICenter} 
            ${CommonStyles.flexJCCenter} 
            ${CommonStyles.flexFill}
        `} onSubmit={registerUserCallback}>
            <span className={`text_type_main-default text_color_primary`}>Регистрация</span>
            <div className={`mt-6`}>
                <Input
                    name="name"
                    disabled={userRegisterRequest}
                    value={values.name || ""}
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                />
            </div>
            <div className={`mt-6`}>
                <Input
                    name="email"
                    disabled={userRegisterRequest}
                    value={values.email || ""}
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={handleChange}
                />
            </div>
            <div className={`mt-6`}>
                <Input
                    name="password"
                    disabled={userRegisterRequest}
                    value={values.password || ""}
                    type={pwdType}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    onIconClick={showPassword}
                    onChange={handleChange}
                />
            </div>
            {userRegisterFailure && <span className='text_type_main-small text_color_error mt-6'>Ошибка регистрации</span>}
            <div className={`mt-6`}>
                <Button htmlType="submit" disabled={userRegisterRequest}>Зарегистрироваться</Button>
            </div>
            <div className={`mt-20`}>
                <span className={`text_type_main-default text_color_inactive`}>Уже зарегистрированы?</span>
                <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
            </div>
        </form>
    );
}
