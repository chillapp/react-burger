import React, {FC, FormEvent, useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authUser, registerUser} from "../../services/actions/auth";
import {IAuth, IStore, IUser} from "../../services/store";
import {AnyAction} from "redux";

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdType, setPwdType] = useState<"password" | "text">('password');

    useEffect(() => {
        dispatch(authUser() as AnyAction);
    }, []);

    const showPassword = () => {
        setPwdType(pwdType === 'password' ? 'text' : 'password')
    }

    const registerUserCallback = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const payload: IUser = {
            email: email,
            password: password,
            name: name
        }
        dispatch(registerUser(payload) as AnyAction);
    }, [name, email, password])

    const authState = useSelector<IStore>(store => store.auth) as IAuth;

    if (authState.user) {
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
                    disabled={authState.registerUser.request}
                    value={name}
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className={`mt-6`}>
                <Input
                    disabled={authState.registerUser.request}
                    value={email}
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className={`mt-6`}>
                <Input
                    disabled={authState.registerUser.request}
                    value={password}
                    type={pwdType}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    onIconClick={showPassword}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            {authState.registerUser.error && <span className='text_type_main-small text_color_error mt-6'>{authState.registerUser.error}</span>}
            <div className={`mt-6`}>
                <Button htmlType="submit" disabled={authState.registerUser.request}>Зарегистрироваться</Button>
            </div>
            <div className={`mt-20`}>
                <span className={`text_type_main-default text_color_inactive`}>Уже зарегистрированы? </span>
                <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
            </div>
        </form>
    );
}
