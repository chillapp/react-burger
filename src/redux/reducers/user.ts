import {TOrder, TUser} from "../types/user";
import {TUserActions} from "../actions/user";


export type TUserState = {
    user: TUser | null

    userAuthRequest: boolean
    userAuthFailure: boolean

    userLoginRequest: boolean
    userLoginFailure: boolean

    userForgotPasswordRequest: boolean
    userForgotPasswordSuccess: boolean
    userForgotPasswordFailure: boolean

    userResetPasswordRequest: boolean
    userResetPasswordSuccess: boolean
    userResetPasswordFailure: boolean

    userLogoutRequest: boolean
    userLogoutSuccess: boolean
    userLogoutFailure: boolean

    userUpdateRequest: boolean,
    userUpdateFailure: boolean,

    userRegisterRequest: boolean,
    userRegisterFailure: boolean,

    order: TOrder | null
    userCreateOrderRequest: boolean
    userCreateOrderFailure: boolean
}

const userInitialState: TUserState = {
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

export const userReducer = (state = userInitialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case "LOGIN_USER_REQUEST": {
            return {
                ...state,
                user: null,
                userLoginRequest: true,
                userLoginFailure: false,
            }
        }
        case "LOGIN_USER_SUCCESS": {
            return {
                ...state,
                user: { ...action.user },
                userLoginRequest: false,
                userLogoutSuccess: false,
            }
        }
        case "LOGIN_USER_FAILURE":{
            return {
                ...state,
                userLoginFailure: true,
                userLoginRequest: false,
            }
        }
        case "USER_CREATE_ORDER_REQUEST": {
            return {
                ...state,
                order: null,
                userCreateOrderRequest: true,
                userCreateOrderFailure: false,
            }
        }
        case "USER_CREATE_ORDER_SUCCESS": {
            return {
                ...state,
                order: action.order,
                userCreateOrderRequest: false,
                userCreateOrderFailure: false,
            }
        }
        case "USER_CREATE_ORDER_FAILURE":{
            return {
                ...state,
                userCreateOrderFailure: true,
                userCreateOrderRequest: false,
            }
        }
        case "AUTH_USER_REQUEST": {
            return {
                ...state,
                userAuthRequest: true,
                userAuthFailure: false,
            }
        }
        case "AUTH_USER_SUCCESS": {
            return {
                ...state,
                user: action.user,
                userAuthRequest: false,
            }
        }
        case "AUTH_USER_FAILURE": {
            return {
                ...state,
                userAuthFailure: true,
                userAuthRequest: false,
            }
        }
        case "FORGOT_PASSWORD_REQUEST": {
            return {
                ...state,
                userForgotPasswordRequest: true,
                userForgotPasswordSuccess: false,
                userForgotPasswordFailure: false,
            }
        }
        case "FORGOT_PASSWORD_SUCCESS": {
            return {
                ...state,
                userForgotPasswordSuccess: true,
                userForgotPasswordRequest: false,
            }
        }
        case "FORGOT_PASSWORD_FAILURE": {
            return {
                ...state,
                userForgotPasswordFailure: true,
                userForgotPasswordRequest: false,
            }
        }
        case "RESET_PASSWORD_REQUEST": {
            return {
                ...state,
                userResetPasswordRequest: true,
                userResetPasswordFailure: false,
                userResetPasswordSuccess: false,
            }
        }
        case "RESET_PASSWORD_SUCCESS": {
            return {
                ...state,
                userResetPasswordSuccess: true,
                userResetPasswordRequest: false
            }
        }
        case "RESET_PASSWORD_FAILURE": {
            return {
                ...state,
                userResetPasswordFailure: true,
                userResetPasswordRequest: false,
            }
        }
        case "LOGOUT_USER_REQUEST": {
            return {
                ...state,
                userLogoutRequest: true,
                userLogoutSuccess: false,
                userLogoutFailure: false,
            }
        }
        case "LOGOUT_USER_SUCCESS": {
            return {
                ...state,
                userLogoutSuccess: true,
                userLogoutRequest: false,
            }
        }
        case "LOGOUT_USER_FAILURE": {
            return {
                ...state,
                userLogoutFailure: true,
                userLogoutRequest: false,
            }
        }
        case "UPDATE_USER_REQUEST": {
            return {
                ...state,
                userUpdateRequest: true,
                userUpdateFailure: false,
            }
        }
        case "UPDATE_USER_SUCCESS": {
            return {
                ...state,
                user: action.user,
                userUpdateRequest: false,
            }
        }
        case "UPDATE_USER_FAILURE":
            return {
                ...state,
                userUpdateFailure: true,
                userUpdateRequest: false,
            }
        case "REGISTER_USER_REQUEST": {
            return {
                ...state,
                userRegisterRequest: true,
                userRegisterFailure: false
            }
        }
        case "REGISTER_USER_SUCCESS": {
            return {
                ...state,
                user: action.user,
                userRegisterRequest: false
            }
        }
        case "REGISTER_USER_FAILURE": {
            return {
                ...state,
                userRegisterFailure: true,
                userRegisterRequest: false
            }
        }
        default: {
            return state;
        }
    }
}
