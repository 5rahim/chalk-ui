import {faker} from "@faker-js/faker"

export type Product = {
    id: string
    name: string
    image: string
    visible: boolean
    availability: "in_stock" | "out_of_stock"
    price: number
    category: string | null
    random_date: Date
}

export const range = (len: number) => {
    const arr: any[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

export const newProduct = (): Product => {
    return {
        id: crypto.randomUUID(),
        name: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({category: "food"}),
        visible: faker.datatype.boolean(),
        availability: faker.helpers.shuffle<Product["availability"]>([
            "in_stock",
            "out_of_stock",
        ])[0]!,
        price: faker.number.int({min: 5, max: 1500}),
        category: faker.helpers.shuffle<Product["category"]>([
            "Food",
            "Electronics",
            "Drink",
            null,
            null,
        ])[0]!,
        random_date: faker.date.anytime(),
    }
}
