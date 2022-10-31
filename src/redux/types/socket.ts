
export type TWSEventsPayload = {
    url: string
    event?: Event | CloseEvent
}

export type TWSActions = {
    wsGetMessage: (payload: string) => any
    wsConnectionError: (payload: TWSEventsPayload) => any
    wsConnectionClosed: (payload: TWSEventsPayload) => any
    wsConnectionSuccess: (payload: TWSEventsPayload) => any
}

export type TWSConnect = {
    url: string
    token?: string
    actions: TWSActions
}
