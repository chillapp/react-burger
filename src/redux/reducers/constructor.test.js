import {constructorInitialState, constructorReducer} from "./constructor";
import * as actions from "../consts/constructor";


const uuidArr = [
    '729794a7-348c-47de-98c5-e70a7841905b',
    '729794a7-348c-47de-98c5-e70a7841904b',
    '729794a7-348c-47de-98c5-e70a7841903b',
    '729794a7-348c-47de-98c5-e70a7841902b',
    '729794a7-348c-47de-98c5-e70a7841901b',
    '729794a7-348c-47de-98c5-e70a7841900b',
    '729794a7-348c-47de-98c5-e70a7841909b',
    '729794a7-348c-47de-98c5-e70a7841908b',
    '729794a7-348c-47de-98c5-e70a7841907b',
]

jest.mock( 'uuid', () => {
    const uuids = uuidArr;
    let ingredientIndex = 0;
    return {
      v4: () => uuids[ingredientIndex++]
    }
});

const ingredient = {
    _id: "uuid_str",
    name: "ingredient_name",
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    type: "main",
    calories: 1000,
    price: 10.52,
    image: "url",
    image_mobile: "mobile_url",
    image_large: "large_url",
    __v: 1999,
}

const ingredient2 = {
    _id: "uuid_str",
    name: "ingredient_name",
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    type: "main",
    calories: 1000,
    price: 756.39,
    image: "url",
    image_mobile: "mobile_url",
    image_large: "large_url",
    __v: 1999,
}

const ingredient3 = {
    _id: "uuid_str",
    name: "ingredient_name",
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    type: "bun",
    calories: 1000,
    price: 50.23,
    image: "url",
    image_mobile: "mobile_url",
    image_large: "large_url",
    __v: 1999,
}

const ingredient4 = {
    _id: "uuid_str",
    name: "ingredient_name",
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    type: "bun",
    calories: 1000,
    price: 70.29,
    image: "url",
    image_mobile: "mobile_url",
    image_large: "large_url",
    __v: 1999,
}

describe('редуктор конструктора', () => {
    it('должен вернуть исходное состояние', () => {
        expect(constructorReducer(undefined, {})).toEqual(constructorInitialState)
    });
    it('должен обработать CONSTRUCTOR_ADD', () => {
        expect(
            constructorReducer(undefined, {
                type: actions.CONSTRUCTOR_ADD,
                ingredient: ingredient
            })
        ).toEqual({
            ...constructorInitialState,
            cart: [
                { ...ingredient, uuid: uuidArr[0] }
            ],
            totalPrice: 10.52
        })
       expect(
            constructorReducer({
                ...constructorInitialState,
                cart: [ingredient],
                totalPrice: 10.52
            }, {
                type: actions.CONSTRUCTOR_ADD,
                ingredient: ingredient2
            })
            ).toEqual({
                ...constructorInitialState,
                cart: [
                    { ...ingredient, uuid: uuidArr[1] },
                    { ...ingredient2, uuid: uuidArr[2] },
                ],
                totalPrice: 766.91
            })
            expect(
                constructorReducer({
                    ...constructorInitialState,
                    cart: [ingredient, ingredient2],
                    totalPrice: 766.91
                }, {
                    type: actions.CONSTRUCTOR_ADD,
                    ingredient: ingredient3
                })
            ).toEqual({
                ...constructorInitialState,
                cart: [
                    { ...ingredient, uuid: uuidArr[3] },
                    { ...ingredient2, uuid: uuidArr[4] },
                    { ...ingredient3, uuid: uuidArr[5] },
                ],
                totalPrice: 766.91 + 50.23
            })
            expect(
                constructorReducer({
                    ...constructorInitialState,
                    cart: [ingredient, ingredient2, ingredient3],
                    totalPrice: 766.91 + 50.23
                }, {
                    type: actions.CONSTRUCTOR_ADD,
                    ingredient: ingredient4
                })
            ).toEqual({
                ...constructorInitialState,
                cart: [
                    { ...ingredient, uuid: uuidArr[6] },
                    { ...ingredient2, uuid: uuidArr[7] },
                    { ...ingredient4, uuid: uuidArr[8] },
                ],
                totalPrice: 766.91 + 70.29
            })
    });
    it('должен обработать CONSTRUCTOR_DEL', () => {
        expect(
            constructorReducer({
                ...constructorInitialState,
                cart: [
                    { ...ingredient, uuid: uuidArr[0] },
                    { ...ingredient2, uuid: uuidArr[1] },
                    { ...ingredient4, uuid: uuidArr[2] },
                ],
                totalPrice: ingredient.price + ingredient2.price + ingredient4.price
            }, {
                type: actions.CONSTRUCTOR_DEL,
                ingredient: { ...ingredient2, uuid: uuidArr[1] },
            })
        ).toEqual({
            ...constructorInitialState,
            cart: [
                { ...ingredient, uuid: uuidArr[0] },
                { ...ingredient4, uuid: uuidArr[2] },
            ],
            totalPrice: ingredient.price + ingredient4.price
        })

        expect(
            constructorReducer({
                ...constructorInitialState,
                cart: [
                    { ...ingredient, uuid: uuidArr[0] },
                    { ...ingredient4, uuid: uuidArr[1] },
                ],
                totalPrice: ingredient.price + ingredient4.price
            }, {
                type: actions.CONSTRUCTOR_DEL,
                ingredient: { ...ingredient4, uuid: uuidArr[1] },
            })
        ).toEqual({
            ...constructorInitialState,
            cart: [
                { ...ingredient, uuid: uuidArr[0] },
            ],
            totalPrice: ingredient.price
        })
    });
    it('должен обработать CONSTRUCTOR_REPLACE', () => {
        expect(
            constructorReducer({
                ...constructorInitialState,
                cart: [
                    { ...ingredient, uuid: uuidArr[0] },
                    { ...ingredient2, uuid: uuidArr[1] },
                    { ...ingredient4, uuid: uuidArr[2] },
                ],
                totalPrice: ingredient.price + ingredient2.price + ingredient4.price
            }, {
                type: actions.CONSTRUCTOR_REPLACE,
                data: {
                    dropIngredient: { ...ingredient, uuid: uuidArr[0] },
                    dragIngredient: { ...ingredient2, uuid: uuidArr[1] }
                },
            })
        ).toEqual({
            ...constructorInitialState,
            cart: [
                { ...ingredient2, uuid: uuidArr[1] },
                { ...ingredient, uuid: uuidArr[0] },
                { ...ingredient4, uuid: uuidArr[2] },
            ],
            totalPrice: ingredient.price + ingredient2.price + ingredient4.price
        })
    });
});
