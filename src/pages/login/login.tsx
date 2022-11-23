import React, {FC, FormEvent, useCallback, useEffect, useState} from "react";
import CommonStyles from "../../styles/common.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {Spinner} from "../../components/spinner/spinner";
import commonStyles from "../../styles/common.module.css";
import {useDispatch, useSelector} from "../../redux/hooks";
import {TLoginRequest} from "../../redux/types/user";
import {userAuthThunk, userLoginThunk} from "../../redux/actions/user";
import {useForm} from "../../hooks/useForm";

export const LoginPage: FC = () => {
    const dispatch = useDispatch();

    const {values, handleChange} = useForm({});

    const [pwdType, setPwdType] = useState<"password" | "text">('password');

    useEffect(() => {
        dispatch(userAuthThunk());
    }, [dispatch]);

    const loginUserCallback = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const payload: TLoginRequest = {
            email: values.email,
            password: values.password
        }
        dispatch(userLoginThunk(payload));
    }, [dispatch, values])

    const showPassword = () => {
        setPwdType(pwdType === 'password' ? 'text' : 'password')
    }

    const {
        user,
        userAuthRequest,
        userLoginRequest,
        userLoginFailure,
    } = useSelector(store => store.user);

    const location = useLocation<{ from: string | undefined }>();
    if (user) {
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
                    userLoginRequest || userAuthRequest
                    ? (
                        <Spinner extraClass={`${commonStyles.flexItemASCenter}`}/>
                    )
                    : (
                        <form onSubmit={loginUserCallback}>
                            <span className={`text_type_main-default text_color_primary`}>Вход</span>
                            <div className={`mt-6`}>
                                <Input
                                    name={"email"}
                                    disabled={userLoginRequest}
                                    value={values.email || ""}
                                    type={'email'}
                                    placeholder={'E-mail'}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`mt-6`}>
                                <Input
                                    name={"password"}
                                    disabled={userLoginRequest}
                                    value={values.password || ""}
                                    type={pwdType}
                                    placeholder={'Пароль'}
                                    icon={'ShowIcon'}
                                    onIconClick={showPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {userLoginFailure && <span className='text_type_main-small text_color_error mt-6'>Ошибка авторизации</span>}
                            <div className={`mt-6`}>
                                <Button htmlType="submit" disabled={userLoginRequest}>Войти</Button>
                            </div>
                            <div className={`mt-20`}>
                                <span className={`text_type_main-default text_color_inactive`}>Вы - новый пользователь? </span>
                                <Link to='/register' className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Зарегистрироваться</Link>
                            </div>
                            <div className={`mt-4`}>
                                <span className={`text_type_main-default text_color_inactive`}>Забыли пароль? </span>
                                <Link to='/forgot-password' className={`text_type_main-default text_color_accent ${CommonStyles.textDecorationNone}`}>Восстановить пароль</Link>
                            </div>
                        </form>
                    )
                }
            </section>
    );
}
