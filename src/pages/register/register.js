import React, {useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authUser, registerUser} from "../../services/actions/auth";

export default function RegisterPage() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdType, setPwdType] = useState('password');

    useEffect(() => {
        dispatch(authUser());
    }, []);

    const showPassword = () => {
        setPwdType(pwdType === 'password' ? 'text' : 'password')
    }

    const registerUserCallback = useCallback(() => {
        const payload = {
            email: email,
            password: password,
            name: name
        }
        dispatch(registerUser(payload));
    }, [name, email, password])

    const authState = useSelector(store => store.auth);

    if (authState.user) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <section className={`
                ${CommonStyles.flexColumn} 
                ${CommonStyles.flexAICenter} 
                ${CommonStyles.flexJCCenter} 
                ${CommonStyles.flexFill}
            `}>
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
                    <Button disabled={authState.registerUser.request} onClick={registerUserCallback}>Зарегистрироваться</Button>
                </div>
                <div className={`mt-20`}>
                    <span className={`text_type_main-default text_color_inactive`}>Уже зарегистрированы? </span>
                    <Link to={'/login'} className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Войти</Link>
                </div>
            </section>
        </>
    );
}
