import {userReducer} from "./user";
import * as actions from "../consts/user";

const initialState = {
    user: null,

    userAuthRequest: false,
    userAuthFailure: false,

    userLoginRequest: false,
    userLoginFailure: false,

    userForgotPasswordRequest: false,
    userForgotPasswordSuccess: false,
    userForgotPasswordFailure: false,

    userResetPasswordRequest: false,
    userResetPasswordSuccess: false,
    userResetPasswordFailure: false,

    userLogoutRequest: false,
    userLogoutSuccess: false,
    userLogoutFailure: false,

    userUpdateRequest: false,
    userUpdateFailure: false,

    userRegisterRequest: false,
    userRegisterFailure: false,

    order: null,
    userCreateOrderRequest: false,
    userCreateOrderFailure: false,
}

const user = {
    name: 'user name',
    email: 'user email'
}

describe('редуктор пользователя', () => {
    it('должен вернуть исходное состояние', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    });
    it('должен обработать LOGIN_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.LOGIN_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            user: null,
            userLoginRequest: true,
            userLoginFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGIN_USER_SUCCESS,
                user: user
            })
        ).toEqual({
            ...initialState,
            user: user,
            userLoginRequest: false,
            userLoginFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGIN_USER_FAILURE,
            })
        ).toEqual({
            ...initialState,
            user: null,
            userLoginFailure: true,
            userLoginRequest: false,
        })
    });
    it('должен обработать USER_CREATE_ORDER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.USER_CREATE_ORDER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            order: null,
            userCreateOrderRequest: true,
            userCreateOrderFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.USER_CREATE_ORDER_SUCCESS,
                order: { order: 2 }
            })
        ).toEqual({
            ...initialState,
            order: { order: 2 },
            userCreateOrderRequest: false,
            userCreateOrderFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.USER_CREATE_ORDER_FAILURE,
            })
        ).toEqual({
            ...initialState,
            order: null,
            userCreateOrderFailure: true,
            userCreateOrderRequest: false,
        })
    });
    it('должен обработать AUTH_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.AUTH_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            userAuthRequest: true,
            userAuthFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.AUTH_USER_SUCCESS,
                user: { user: 2 }
            })
        ).toEqual({
            ...initialState,
            user: { user: 2 },
            userAuthRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.AUTH_USER_FAILURE,
            })
        ).toEqual({
            ...initialState,
            user: null,
            userAuthFailure: true,
            userAuthRequest: false,
        })
    });
    it('должен обработать FORGOT_PASSWORD_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            ...initialState,
            userForgotPasswordRequest: true,
            userForgotPasswordSuccess: false,
            userForgotPasswordFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            userForgotPasswordSuccess: true,
            userForgotPasswordRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.FORGOT_PASSWORD_FAILURE,
            })
        ).toEqual({
            ...initialState,
            userForgotPasswordFailure: true,
            userForgotPasswordRequest: false,
        })
    });
    it('должен обработать RESET_PASSWORD_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            ...initialState,
            userResetPasswordRequest: true,
            userResetPasswordFailure: false,
            userResetPasswordSuccess: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.RESET_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            userResetPasswordSuccess: true,
            userResetPasswordRequest: false
        })

        expect(
            userReducer(undefined, {
                type: actions.RESET_PASSWORD_FAILURE,
            })
        ).toEqual({
            ...initialState,
            userResetPasswordFailure: true,
            userResetPasswordRequest: false,
        })
    });
    it('должен обработать LOGOUT_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.LOGOUT_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            userLogoutRequest: true,
            userLogoutSuccess: false,
            userLogoutFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGOUT_USER_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            userLogoutSuccess: true,
            userLogoutRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGOUT_USER_FAILURE,
            })
        ).toEqual({
            ...initialState,
            userLogoutFailure: true,
            userLogoutRequest: false,
        })
    });
    it('должен обработать UPDATE_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.UPDATE_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            userUpdateRequest: true,
            userUpdateFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.UPDATE_USER_SUCCESS,
                user: user
            })
        ).toEqual({
            ...initialState,
            user: user,
            userUpdateRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.UPDATE_USER_FAILURE,
            })
        ).toEqual({
            ...initialState,
            userUpdateFailure: true,
            userUpdateRequest: false,
        })
    });
    it('должен обработать REGISTER_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.REGISTER_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            userRegisterRequest: true,
            userRegisterFailure: false
        })

        expect(
            userReducer(undefined, {
                type: actions.REGISTER_USER_SUCCESS,
                user: user
            })
        ).toEqual({
            ...initialState,
            user: user,
            userRegisterRequest: false
        })

        expect(
            userReducer(undefined, {
                type: actions.REGISTER_USER_FAILURE,
            })
        ).toEqual({
            ...initialState,
            userRegisterFailure: true,
            userRegisterRequest: false
        })
    });
});
