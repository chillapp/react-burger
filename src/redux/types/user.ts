export type TLoginRequest = {
    email: string,
    password: string
}

export type TLoginResponse = {
    user: TUser
    accessToken: string
    refreshToken: string
}

export type TUser = {
    name: string
    email: string
    password?: string
    refreshToken?: string
    accessToken?: string
}

export type TOrder = {
    name: string
    number: number
}

export type TCreateOrderResponse = {
    name: string
    order: {
        number: number
    }
}

export type TResetPasswordRequest = {
    token: string
    password: string
}

export type TUserUpdateRequest = {
    name?: string
    email?: string
    password?: string
}
