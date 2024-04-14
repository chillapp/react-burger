import {userInitialState, userReducer} from "./user";
import * as actions from "../consts/user";

const user = {
    name: 'user name',
    email: 'user email'
}

describe('редуктор пользователя', () => {
    it('должен вернуть исходное состояние', () => {
        expect(userReducer(undefined, {})).toEqual(userInitialState)
    });
    it('должен обработать LOGIN_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: actions.LOGIN_USER_REQUEST,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            user: user,
            userLoginRequest: false,
            userLoginFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGIN_USER_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
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
            ...userInitialState,
            order: { order: 2 },
            userCreateOrderRequest: false,
            userCreateOrderFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.USER_CREATE_ORDER_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            userAuthRequest: true,
            userAuthFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.AUTH_USER_SUCCESS,
                user: { user: 2 }
            })
        ).toEqual({
            ...userInitialState,
            user: { user: 2 },
            userAuthRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.AUTH_USER_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            userForgotPasswordRequest: true,
            userForgotPasswordSuccess: false,
            userForgotPasswordFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...userInitialState,
            userForgotPasswordSuccess: true,
            userForgotPasswordRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.FORGOT_PASSWORD_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            userResetPasswordRequest: true,
            userResetPasswordFailure: false,
            userResetPasswordSuccess: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.RESET_PASSWORD_SUCCESS,
            })
        ).toEqual({
            ...userInitialState,
            userResetPasswordSuccess: true,
            userResetPasswordRequest: false
        })

        expect(
            userReducer(undefined, {
                type: actions.RESET_PASSWORD_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            userLogoutRequest: true,
            userLogoutSuccess: false,
            userLogoutFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGOUT_USER_SUCCESS,
            })
        ).toEqual({
            ...userInitialState,
            userLogoutSuccess: true,
            userLogoutRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.LOGOUT_USER_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            userUpdateRequest: true,
            userUpdateFailure: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.UPDATE_USER_SUCCESS,
                user: user
            })
        ).toEqual({
            ...userInitialState,
            user: user,
            userUpdateRequest: false,
        })

        expect(
            userReducer(undefined, {
                type: actions.UPDATE_USER_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
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
            ...userInitialState,
            userRegisterRequest: true,
            userRegisterFailure: false
        })

        expect(
            userReducer(undefined, {
                type: actions.REGISTER_USER_SUCCESS,
                user: user
            })
        ).toEqual({
            ...userInitialState,
            user: user,
            userRegisterRequest: false
        })

        expect(
            userReducer(undefined, {
                type: actions.REGISTER_USER_FAILURE,
            })
        ).toEqual({
            ...userInitialState,
            userRegisterFailure: true,
            userRegisterRequest: false
        })
    });
});
