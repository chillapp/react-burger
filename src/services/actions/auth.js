import {createAction} from "@reduxjs/toolkit";
import {getApiUrl} from "../../components/app/app";
import {checkResponse, checkSuccess} from "../http";
import {getCookie, setCookie} from "../../utils/common";

export const forgotPasswordRequest = createAction('AUTH/FORGOT_PASSWORD/REQUEST');
export const forgotPasswordSuccess = createAction('AUTH/FORGOT_PASSWORD/SUCCESS');
export const forgotPasswordFail = createAction('AUTH/FORGOT_PASSWORD/FAIL');
export function forgotPassword(email) {
    return function (dispatch) {
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

export const resetPasswordRequest = createAction('AUTH/RESET_PASSWORD/REQUEST');
export const resetPasswordSuccess = createAction('AUTH/RESET_PASSWORD/SUCCESS');
export const resetPasswordFail = createAction('AUTH/RESET_PASSWORD/FAIL');
export function resetPassword(data) {
    return function (dispatch) {
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

export const registerUserRequest = createAction('AUTH/REGISTER_USER/REQUEST');
export const registerUserSuccess = createAction('AUTH/REGISTER_USER/SUCCESS');
export const registerUserFail = createAction('AUTH/REGISTER_USER/FAIL');
export function registerUser(data) {
    return function (dispatch) {
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
                dispatch(registerUserSuccess(payload));
            })
            .catch(error => dispatch(registerUserFail(error)));
    }
}

export const loginUserRequest = createAction('AUTH/LOGIN_USER/REQUEST');
export const loginUserSuccess = createAction('AUTH/LOGIN_USER/SUCCESS');
export const loginUserFail = createAction('AUTH/LOGIN_USER/FAIL');
export function loginUser(data) {
    return function (dispatch) {
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
                dispatch(loginUserSuccess(payload))
            })
            .catch(error => dispatch(loginUserFail(error)));
    }
}

export const logoutUserRequest = createAction('AUTH/LOGOUT_USER/REQUEST');
export const logoutUserSuccess = createAction('AUTH/LOGOUT_USER/SUCCESS');
export const logoutUserFail = createAction('AUTH/LOGOUT_USER/FAIL');
export function logoutUser() {
    return function (dispatch) {
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
export const authUserSuccess = createAction('AUTH/AUTH_USER/SUCCESS');
export const authUserFail = createAction('AUTH/AUTH_USER/FAIL');
export function authUser() {
    return function (dispatch) {
        dispatch(authUserRequest());
        const accessToken = getCookie('accessToken');
        fetch(getApiUrl('auth/user'), {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
            },
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => dispatch(authUserSuccess(payload)))
            .catch((err) => dispatch(authUserFail(err)));
    }
}

export const updateUserRequest = createAction('AUTH/UPDATE_USER/REQUEST');
export const updateUserSuccess = createAction('AUTH/UPDATE_USER/SUCCESS');
export const updateUserFail = createAction('AUTH/UPDATE_USER/FAIL');
export function updateUser(data) {
    return function (dispatch) {
        dispatch(updateUserRequest());
        const accessToken = getCookie('accessToken');
        fetch(getApiUrl('auth/user'), {
            method: 'PATCH',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data)
        })
            .then(checkResponse)
            .then(checkSuccess)
            .then(payload => {
                dispatch(updateUserSuccess(payload))
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

function saveTokens(refreshToken, accessToken) {
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
}

function clearTokens() {
    localStorage.setItem('refreshToken', null);
    setCookie('accessToken', null, { expired: -1 });
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

function refreshToken(afterRefresh, data) {
    return function (dispatch) {
        refreshTokenRequest()
            .then((res) => {
                saveTokens(res.refreshToken, res.accessToken);
                dispatch(afterRefresh(data));
            })
    }
}
