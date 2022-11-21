import {
    AUTH_USER_FAILURE,
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_CREATE_ORDER_FAILURE,
    USER_CREATE_ORDER_REQUEST,
    USER_CREATE_ORDER_SUCCESS
} from "../consts/user";
import {
    TCreateOrderResponse,
    TLoginRequest,
    TLoginResponse,
    TOrder,
    TResetPasswordRequest,
    TUser,
    TUserUpdateRequest
} from "../types/user";
import {AppDispatch, AppThunk} from "../types";
import {checkResponse, checkSuccess, getApiUrl} from "../../services/http";
import {getCookie, setCookie} from "../../utils/common";

// USER LOGIN
interface IUserLoginRequestAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}
const userLoginRequest = (): IUserLoginRequestAction => ({
    type: LOGIN_USER_REQUEST
});

interface IUserLoginSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly user: TUser
}
const userLoginSuccess = (user: TUser): IUserLoginSuccessAction => ({
    type: LOGIN_USER_SUCCESS,
    user: user
});

interface IUserLoginFailureAction {
    readonly type: typeof LOGIN_USER_FAILURE;
}
const userLoginFailure = (): IUserLoginFailureAction => ({
    type: LOGIN_USER_FAILURE,
});

export const userLoginThunk: AppThunk = (login: TLoginRequest) => (dispatch: AppDispatch) => {
    dispatch(userLoginRequest());
    const promise = fetch(getApiUrl('auth/login'), {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
    promise
        .then(checkResponse)
        .then(checkSuccess<TLoginResponse>)
        .then(data => {
            localStorage.setItem("refreshToken", data.refreshToken || "");
            setCookie("accessToken", data.accessToken || "");
            dispatch(userLoginSuccess(data.user))
        })
        .catch(() => dispatch(userLoginFailure()));
};

// USER CREATE ORDER
interface IUserCreateOrderRequestAction {
    readonly type: typeof USER_CREATE_ORDER_REQUEST;
}
const userCreateOrderRequest = (): IUserCreateOrderRequestAction => ({
    type: USER_CREATE_ORDER_REQUEST
});

export interface IUserCreateOrderSuccessAction {
    readonly type: typeof USER_CREATE_ORDER_SUCCESS;
    readonly order: TOrder
}
const userCreateOrderSuccess = (order: TOrder): IUserCreateOrderSuccessAction => ({
    type: USER_CREATE_ORDER_SUCCESS,
    order: order
});

interface IUserCreateOrderFailureAction {
    readonly type: typeof USER_CREATE_ORDER_FAILURE;
}
const userCreateOrderFailure = (): IUserCreateOrderFailureAction => ({
    type: USER_CREATE_ORDER_FAILURE
});

export const userCreateOrderThunk: AppThunk = (ingredients: string[]) => (dispatch: AppDispatch) => {
    dispatch(userCreateOrderRequest());
    const promise = fetch(getApiUrl("orders"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ingredients }),
    });
    promise
        .then(checkResponse)
        .then(checkSuccess<TCreateOrderResponse>)
        .then(data => dispatch(userCreateOrderSuccess({ name: data.name, number: data.order.number })))
        .catch(() => dispatch(userCreateOrderFailure()));
};

// USER AUTH
interface IUserAuthRequestAction {
    readonly type: typeof AUTH_USER_REQUEST;
}
export const userAuthRequest = (): IUserAuthRequestAction => ({
    type: AUTH_USER_REQUEST
});

interface IUserAuthSuccessAction {
    readonly type: typeof AUTH_USER_SUCCESS;
    readonly user: TUser
}
const userAuthSuccess = (user: TUser): IUserAuthSuccessAction => ({
    type: AUTH_USER_SUCCESS,
    user: user
});

interface IUserAuthFailureAction {
    readonly type: typeof AUTH_USER_FAILURE;
}
const userAuthFailure = (): IUserAuthFailureAction => ({
    type: AUTH_USER_FAILURE,
});

export const userAuthThunk: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userAuthRequest());
    const promise = fetch(getApiUrl("auth/user"), {
        method: 'GET',
        headers: {
            "Authorization": getCookie("accessToken"),
        },
    });
    promise
        .then(checkResponse)
        .then(checkSuccess<{user: TUser}>)
        .then(data => dispatch(userAuthSuccess(data.user)))
        .catch((err) => {
            if (err === "jwt expire") {
                dispatch(userAuthFailure());
            } else {
                dispatch(userAuthFailure());
            }
        });
};

// USER FORGOT PASSWORD
interface IUserForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
const userForgotPasswordRequest = (): IUserForgotPasswordRequestAction => ({
    type: FORGOT_PASSWORD_REQUEST
});

interface IUserForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
const userForgotPasswordSuccess = (): IUserForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS
});

interface IUserForgotPasswordFailureAction {
    readonly type: typeof FORGOT_PASSWORD_FAILURE;
}
const userForgotPasswordFailure = (): IUserForgotPasswordFailureAction => ({
    type: FORGOT_PASSWORD_FAILURE
});

export const userForgotPasswordThunk: AppThunk = (email: string) => (dispatch: AppDispatch) => {
    dispatch(userForgotPasswordRequest());
    const promise = fetch(getApiUrl("password-reset"), {
        method: 'POST',
        body: JSON.stringify({ email } ),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
    promise
        .then(checkResponse)
        .then(checkSuccess)
        .then(() => dispatch(userForgotPasswordSuccess()))
        .catch(() => dispatch(userForgotPasswordFailure()));
};

// USER RESET PASSWORD
interface IUserResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
const userResetPasswordRequest = (): IUserResetPasswordRequestAction => ({
    type: RESET_PASSWORD_REQUEST
});

interface IUserResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
const userResetPasswordSuccess = (): IUserResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS
});

interface IUserResetPasswordFailureAction {
    readonly type: typeof RESET_PASSWORD_FAILURE;
}
const userResetPasswordFailure = (): IUserResetPasswordFailureAction => ({
    type: RESET_PASSWORD_FAILURE
});

export const userResetPasswordThunk: AppThunk = (data: TResetPasswordRequest) => (dispatch: AppDispatch) => {
    dispatch(userResetPasswordRequest());
    const promise = fetch(getApiUrl("password-reset/reset"), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
    promise
        .then(checkResponse)
        .then(checkSuccess)
        .then(() => dispatch(userResetPasswordSuccess()))
        .catch(() => dispatch(userResetPasswordFailure()));
};

// USER LOGOUT
interface IUserLogoutRequestAction {
    readonly type: typeof LOGOUT_USER_REQUEST;
}
const userLogoutRequest = (): IUserLogoutRequestAction => ({
    type: LOGOUT_USER_REQUEST
});

interface IUserLogoutSuccessAction {
    readonly type: typeof LOGOUT_USER_SUCCESS;
}
const userLogoutSuccess= (): IUserLogoutSuccessAction => ({
    type: LOGOUT_USER_SUCCESS
});

interface IUserLogoutFailureAction {
    readonly type: typeof LOGOUT_USER_FAILURE;
}
const userLogoutFailure= (): IUserLogoutFailureAction => ({
    type: LOGOUT_USER_FAILURE
});

export const userLogoutThunk: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userLogoutRequest());
    const promise = fetch(getApiUrl("auth/logout"), {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
    promise
        .then(checkResponse)
        .then(checkSuccess)
        .then(() => dispatch(userLogoutSuccess()))
        .catch(() => dispatch(userLogoutFailure()));
};

// USER UPDATE
interface IUserUpdateRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}
const userUpdateRequest = (): IUserUpdateRequestAction => ({
    type: UPDATE_USER_REQUEST
});

interface IUserUpdateSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser
}
const userUpdateSuccess = (user: TUser): IUserUpdateSuccessAction => ({
    type: UPDATE_USER_SUCCESS,
    user: user
});

interface IUserUpdateFailureAction {
    readonly type: typeof UPDATE_USER_FAILURE;
}
const userUpdateFailure = (): IUserUpdateFailureAction => ({
    type: UPDATE_USER_FAILURE
});

export const userUpdateThunk: AppThunk = (data: TUserUpdateRequest) => (dispatch: AppDispatch) => {
    dispatch(userUpdateRequest());
    const promise = fetch(getApiUrl("auth/user"), {
        method: 'PATCH',
        headers: {
            "Authorization": getCookie("accessToken"),
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
    });
    promise
        .then(checkResponse)
        .then(checkSuccess<{user: TUser}>)
        .then((data) => dispatch(userUpdateSuccess(data.user)))
        .catch(() => dispatch(userUpdateFailure()));
};

// USER REGISTER

interface IUserRegisterRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}
const userRegisterRequest = (): IUserRegisterRequestAction => ({
    type: REGISTER_USER_REQUEST
});

interface IUserRegisterSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly user: TUser
}
const userRegisterSuccess = (user: TUser): IUserRegisterSuccessAction => ({
    type: REGISTER_USER_SUCCESS,
    user: user
});

interface IUserRegisterFailureAction {
    readonly type: typeof REGISTER_USER_FAILURE;
}
const userRegisterFailure = (): IUserRegisterFailureAction => ({
    type: REGISTER_USER_FAILURE
});

export const userRegisterThunk: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
    dispatch(userRegisterRequest());
    const promise = fetch(getApiUrl("auth/register"), {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
    promise
        .then(checkResponse)
        .then(checkSuccess<TLoginResponse>)
        .then((data) => {
            localStorage.setItem("refreshToken", data.refreshToken || "");
            setCookie("accessToken", data.accessToken || "");
            dispatch(userRegisterSuccess(data.user))
        })
        .catch(() => dispatch(userRegisterFailure()));
};


export type TUserActions =
    IUserLoginRequestAction |
    IUserLoginSuccessAction |
    IUserLoginFailureAction |
    IUserCreateOrderRequestAction |
    IUserCreateOrderSuccessAction |
    IUserCreateOrderFailureAction |
    IUserAuthRequestAction |
    IUserAuthSuccessAction |
    IUserAuthFailureAction |
    IUserForgotPasswordRequestAction |
    IUserForgotPasswordSuccessAction |
    IUserForgotPasswordFailureAction |
    IUserResetPasswordRequestAction |
    IUserResetPasswordSuccessAction |
    IUserResetPasswordFailureAction |
    IUserLogoutRequestAction |
    IUserLogoutSuccessAction |
    IUserLogoutFailureAction |
    IUserUpdateRequestAction |
    IUserUpdateSuccessAction |
    IUserUpdateFailureAction |
    IUserRegisterRequestAction |
    IUserRegisterSuccessAction |
    IUserRegisterFailureAction


/*function refreshTokenRequest() {
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

function refreshToken(afterRefresh: Function, data) {
    return function (dispatch: Function) {
        refreshTokenRequest()
            .then((response: TLoginResponse) => {
                localStorage.setItem("refreshToken", response.refreshToken || "");
                setCookie("accessToken", response.accessToken || "");
                dispatch(afterRefresh(data));
            })
    }
}*/

