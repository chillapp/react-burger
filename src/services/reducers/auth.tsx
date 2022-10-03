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
import {IAuth} from "../store"

const initialAuthState: IAuth = {
    user: null,
    registerUser: {
        success: false,
        request: false,
        error: null
    },
    forgotPassword: {
        email: null,
        success: false,
        request: false,
        error: null
    },
    resetPassword: {
        payload: null,
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
        error: null,
        isLoaded: false,
    },
    logoutUser: {
        request: false,
        success: false,
        error: null,
    },
    updateUser: {
        success: false,
        request: false,
        error: null,
    },
}

export const authReducer = createReducer(initialAuthState, (builder) => {
    builder
        .addCase(forgotPasswordRequest, (state, action) => {
            const currentState = current(state);
            return {
                ...currentState,
                forgotPassword: {
                    email: action.payload,
                    request: true,
                    success: false,
                    error: null,
                }
            }
        })
        .addCase(forgotPasswordSuccess, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                forgotPassword: {
                    ...currentState.forgotPassword,
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

        .addCase(resetPasswordRequest, (state, action) => {
            const currentState = current(state);
            return {
                ...currentState,
                resetPassword: {
                    error: null,
                    request: true,
                    success: false,
                    payload: action.payload,
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
        .addCase(registerUserSuccess, (state, { payload: user }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: user,
                registerUser: {
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(registerUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                registerUser: {
                    error: error,
                    success: false,
                    request: false
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
        .addCase(loginUserSuccess, (state, { payload: user }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: user,
                loginUser: {
                    data: null,
                    success: true,
                    request: false,
                    error: null,
                }
            };
        })
        .addCase(loginUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                loginUser: {
                    data: null,
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
                    error: null,
                    request: true,
                    success: false,
                    isLoaded:false
                }
            };
        })
        .addCase(authUserSuccess, (state, { payload: user }) => {
            const currentState = current(state);

            return {
                ...currentState,
                user: user,
                authUser: {
                    error: null,
                    success: true,
                    request: false,
                    isLoaded: true
                }
            };
        })
        .addCase(authUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            return {
                ...currentState,
                user: null,
                authUser: {
                    error: error,
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
                    error: null,
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
                    error: null,
                    success: true,
                    request: false,
                }
            };
        })
        .addCase(logoutUserFail, (state, { payload: error }) => {
            const currentState = current(state);
            return {
                ...currentState,
                logoutUser: {
                    error: error,
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
                    error: null,
                    request: true,
                    success: false
                }
            };
        })
        .addCase(updateUserSuccess, (state) => {
            const currentState = current(state);
            return {
                ...currentState,
                updateUser: {
                    error: null,
                    success: true,
                    request: false,
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
