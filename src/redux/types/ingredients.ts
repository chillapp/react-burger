export type TIngredient = {
    _id: string
    name: string
    proteins: number
    fat: number
    carbohydrates: number
    type: "bun" | "main" | "sauce"
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v:number
    uuid?: string
}
