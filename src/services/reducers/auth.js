import {createReducer, current} from "@reduxjs/toolkit";
import {
    authUserFail,
    authUserRequest,
    authUserSuccess,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    loginUserFail,
    loginUserRequest,
    loginUserSuccess, logoutUserFail, logoutUserRequest, logoutUserSuccess,
    registerUserFail,
    registerUserRequest,
    registerUserSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    updateUserFail, updateUserRequest,
    updateUserSuccess
} from "../actions/auth";

const initialState = {
    auth: {
        user: null,
        registerUser: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        forgotPassword: {
            data: null,
            success: false,
            request: false,
        },
        resetPassword: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        loginUser: {
            data: null,
            success: false,
            request: false,
            error: null
        },
        authUser: {
            success: false,
            request: false,
            isLoaded: false,
        },
        logoutUser: {
            request: false,
            success: false,
        },
        updateUser: {
            success: false,
            request: false,
            error: null,
        },
    }
}

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(forgotPasswordRequest, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                forgotPassword: {
                    data: payload,
                    request: true,
                    success: false,
                    error: null,
                }
            };
        })
        .addCase(forgotPasswordSuccess, (state) => {
            const currentState = current(state);
            const forgotPasswordState = currentState.forgotPassword;
            return {
                ...currentState,
                forgotPassword: {
                    ...forgotPasswordState,
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(forgotPasswordFail, (state, { payload: error }) => {
            const currentState = current(state);
            const forgotPasswordState = currentState.forgotPassword;
            return {
                ...currentState,
                forgotPassword: {
                    ...forgotPasswordState,
                    success: false,
                    request: false,
                    error: error
                }
            };
        })

        .addCase(resetPasswordRequest, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                resetPassword: {
                    data: payload,
                    request: true,
                    success: false,
                    error: null,
                }
            };
        })
        .addCase(resetPasswordSuccess, (state) => {
            const currentState = current(state);
            const resetPasswordState = currentState.resetPassword;
            return {
                ...currentState,
                resetPassword: {
                    ...resetPasswordState,
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(resetPasswordFail, (state, { payload: error }) => {
            const currentState = current(state);
            const resetPasswordState = currentState.resetPassword;
            return {
                ...currentState,
                resetPassword: {
                    ...resetPasswordState,
                    success: false,
                    request: false,
                    error: error
                }
            };
        })

        .addCase(registerUserRequest, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                registerUser: {
                    data: payload,
                    request: true,
                    success: false,
                    error: null,
                }
            };
        })
        .addCase(registerUserSuccess, (state, { payload }) => {
            const currentState = current(state);
            const registerUserState = currentState.registerUser;
            return {
                ...currentState,
                ...payload,
                registerUser: {
                    ...registerUserState,
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(registerUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            const registerUserState = currentState.registerUser;
            return {
                ...currentState,
                user: null,
                registerUser: {
                    ...registerUserState,
                    success: false,
                    request: false,
                    error: error
                }
            };
        })

        .addCase(loginUserRequest, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                loginUser: {
                    data: payload,
                    request: true,
                    success: false,
                    error: null,
                }
            };
        })
        .addCase(loginUserSuccess, (state, { payload }) => {
            const currentState = current(state);
            const loginUserState = currentState.loginUser;
            return {
                ...currentState,
                ...payload,
                loginUser: {
                    ...loginUserState,
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(loginUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            const loginUserState = currentState.loginUser;
            return {
                ...currentState,
                user: null,
                loginUser: {
                    ...loginUserState,
                    success: false,
                    request: false,
                    error: error
                }
            };
        })

        .addCase(authUserRequest, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                authUser: {
                    request: true,
                    success: false,
                    isLoaded:false
                }
            };
        })
        .addCase(authUserSuccess, (state, { payload }) => {
            const currentState = current(state);
            return {
                ...currentState,
                ...payload,
                authUser: {
                    success: true,
                    request: false,
                    isLoaded: true
                }
            };
        })
        .addCase(authUserFail, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                authUser: {
                    success: false,
                    request: false,
                    isLoaded: true
                }
            };
        })

        .addCase(logoutUserRequest, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                logoutUser: {
                    request: true,
                    success: false,
                }
            };
        })
        .addCase(logoutUserSuccess, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                logoutUser: {
                    success: true,
                    request: false,
                }
            };
        })
        .addCase(logoutUserFail, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                logoutUser: {
                    success: false,
                    request: false,
                }
            };
        })

        .addCase(updateUserRequest, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                updateUser: {
                    request: true,
                    success: false,
                    error: null
                }
            };
        })
        .addCase(updateUserSuccess, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                updateUser: {
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(updateUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            return {
                ...currentState,
                updateUser: {
                    success: false,
                    request: false,
                    error: error
                }
            };
        })
})
