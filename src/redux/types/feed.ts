
export type TFeedOrder = {
    _id: string
    status: "created" | "pending" | "done"
    name: string
    number: number
    updatedAt: string
    createdAt: string
    ingredients: string[]
}

export type TFeed = {
    orders: TFeedOrder[]
    total: number
    totalToday: number
}
