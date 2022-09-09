import React, {useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authUser, loginUser} from "../../services/actions/auth";
import Spinner from "../../components/spinner/spinner";
import commonStyles from "../../styles/common.module.css";

export default function LoginPage() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdType, setPwdType] = useState('password');

    useEffect(() => {
        dispatch(authUser());
    }, []);

    const loginUserCallback = useCallback(() => {
        const payload = {
            email: email,
            password: password
        }
        dispatch(loginUser(payload));
    }, [email, password])

    const showPassword = () => {
        setPwdType(pwdType === 'password' ? 'text' : 'password')
    }

    const authState = useSelector(store => store.auth);

    const location = useLocation();
    if (authState.user) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    return (
            <section className={`
                ${CommonStyles.flexColumn} 
                ${CommonStyles.flexAICenter} 
                ${CommonStyles.flexJCCenter} 
                ${CommonStyles.flexFill}
            `}>
                {
                    !authState.authUser.isLoaded
                    ? (
                        <Spinner extraClass={`${commonStyles.flexItemASCenter}`}/>
                    )
                    : (
                        <>
                            <span className={`text_type_main-default text_color_primary`}>Вход</span>
                            <div className={`mt-6`}>
                                <Input
                                    disabled={authState.loginUser.request}
                                    value={email}
                                    type={'email'}
                                    placeholder={'E-mail'}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={`mt-6`}>
                                <Input
                                    disabled={authState.loginUser.request}
                                    value={password}
                                    type={pwdType}
                                    placeholder={'Пароль'}
                                    icon={'ShowIcon'}
                                    onIconClick={showPassword}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {authState.loginUser.error && <span className='text_type_main-small text_color_error mt-6'>{authState.loginUser.error}</span>}
                            <div className={`mt-6`}>
                                <Button disabled={authState.loginUser.request} onClick={loginUserCallback}>Войти</Button>
                            </div>
                            <div className={`mt-20`}>
                                <span className={`text_type_main-default text_color_inactive`}>Вы - новый пользователь? </span>
                                <Link to='/register' className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Зарегистрироваться</Link>
                            </div>
                            <div className={`mt-4`}>
                                <span className={`text_type_main-default text_color_inactive`}>Забыли пароль? </span>
                                <Link to='/forgot-password' className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Восстановить пароль</Link>
                            </div>
                        </>
                    )
                }
            </section>
    );
}
