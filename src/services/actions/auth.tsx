import {createAction} from "@reduxjs/toolkit";
import {getApiUrl} from "../../components/app/app";
import {checkResponse, checkSuccess} from "../http";
import {getCookie, setCookie} from "../../utils/common";
import {IResetPasswordPayload} from "../../pages/reset-password/reset-password";
import {IUser} from "../store";
import {ILoginRequest} from "../../pages/login/login";

export const forgotPasswordRequest = createAction<string>('AUTH/FORGOT_PASSWORD/REQUEST');
export const forgotPasswordSuccess = createAction<string>('AUTH/FORGOT_PASSWORD/SUCCESS');
export const forgotPasswordFail = createAction<string>('AUTH/FORGOT_PASSWORD/FAIL');
export function forgotPassword(email: string): unknown {
    return function (dispatch: Function) {
        dispatch(forgotPasswordRequest(email));
        fetch(getApiUrl('password-reset'), {
            method: 'POST',
            body: JSON.stringify({ email } ),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(forgotPasswordSuccess(payload.data)))
            .catch(error => dispatch(forgotPasswordFail(error)));
    }
}

export const resetPasswordRequest = createAction<IResetPasswordPayload>('AUTH/RESET_PASSWORD/REQUEST');
export const resetPasswordSuccess = createAction<string>('AUTH/RESET_PASSWORD/SUCCESS');
export const resetPasswordFail = createAction<string>('AUTH/RESET_PASSWORD/FAIL');
export function resetPassword(data: IResetPasswordPayload): unknown {
    return function (dispatch: Function) {
        dispatch(resetPasswordRequest(data));
        fetch(getApiUrl('password-reset/reset'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(resetPasswordSuccess(payload.data)))
            .catch(error => dispatch(resetPasswordFail(error)));
    }
}

export const registerUserRequest = createAction<IUser>('AUTH/REGISTER_USER/REQUEST');
export const registerUserSuccess = createAction<IUser>('AUTH/REGISTER_USER/SUCCESS');
export const registerUserFail = createAction<string>('AUTH/REGISTER_USER/FAIL');
export function registerUser(data: IUser): unknown {
    return function (dispatch: Function) {
        dispatch(registerUserRequest(data));
        fetch(getApiUrl('auth/register'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => {
                saveTokens(payload.refreshToken, payload.accessToken);
                dispatch(registerUserSuccess(payload as IUser));
            })
            .catch(error => dispatch(registerUserFail(error)));
    }
}

export const loginUserRequest = createAction<ILoginRequest>('AUTH/LOGIN_USER/REQUEST');
export const loginUserSuccess = createAction<IUser>('AUTH/LOGIN_USER/SUCCESS');
export const loginUserFail = createAction<string>('AUTH/LOGIN_USER/FAIL');
export function loginUser(data: ILoginRequest): unknown {
    return function (dispatch: Function) {
        dispatch(loginUserRequest(data));
        fetch(getApiUrl('auth/login'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => {
                saveTokens(payload.refreshToken, payload.accessToken);
                dispatch(loginUserSuccess(payload as IUser))
            })
            .catch(error => dispatch(loginUserFail(error)));
    }
}

export const logoutUserRequest = createAction('AUTH/LOGOUT_USER/REQUEST');
export const logoutUserSuccess = createAction('AUTH/LOGOUT_USER/SUCCESS');
export const logoutUserFail = createAction<string>('AUTH/LOGOUT_USER/FAIL');
export function logoutUser(): unknown {
    return function (dispatch: Function) {
        dispatch(logoutUserRequest());
        fetch(getApiUrl('auth/logout'), {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(() => {
                clearTokens();
                dispatch(logoutUserSuccess());
            })
            .catch(error => dispatch(logoutUserFail(error)));
    }
}

export const authUserRequest = createAction('AUTH/AUTH_USER/REQUEST');
export const authUserSuccess = createAction<IUser>('AUTH/AUTH_USER/SUCCESS');
export const authUserFail = createAction<string>('AUTH/AUTH_USER/FAIL');
export function authUser(): unknown {
    return function (dispatch: Function) {
        dispatch(authUserRequest());
        const accessToken = getCookie("accessToken");
        fetch(getApiUrl("auth/user"), {
            method: 'GET',
            headers: {
                "Authorization": accessToken,
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(authUserSuccess(payload.user as IUser)))
            .catch((err) => dispatch(authUserFail(err)));
    }
}

export const updateUserRequest = createAction('AUTH/UPDATE_USER/REQUEST');
export const updateUserSuccess = createAction<IUser>('AUTH/UPDATE_USER/SUCCESS');
export const updateUserFail = createAction<string>('AUTH/UPDATE_USER/FAIL');
export function updateUser(data: IUser): unknown {
    return function (dispatch: Function) {
        dispatch(updateUserRequest());
        const accessToken = getCookie('accessToken');
        fetch(getApiUrl('auth/user'), {
            method: 'PATCH',
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data)
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => {
                dispatch(updateUserSuccess(payload as IUser))
            })
            .catch(err => {
                if (err === 'jwt expired') {
                    dispatch(refreshToken(updateUser, data))
                } else {
                    dispatch(updateUserFail(err))
                }
            });
    }
}

function saveTokens(refreshToken: string, accessToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
    setCookie("accessToken", accessToken);
}

function clearTokens() {
    localStorage.removeItem("refreshToken");
    setCookie("accessToken", null, { expired: -1 });
}

function refreshTokenRequest() {
    return fetch(getApiUrl('auth/token'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }).then(checkResponse).then(checkSuccess);
}

function refreshToken(afterRefresh: Function, data: IUser) {
    return function (dispatch: Function) {
        refreshTokenRequest()
            .then((res) => {
                saveTokens(res.refreshToken, res.accessToken);
                dispatch(afterRefresh(data));
            })
    }
}
