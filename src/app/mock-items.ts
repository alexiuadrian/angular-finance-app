import { Item } from "./Item";

export const ITEMS: Item[] = [
    {
        id: 1,
        name: 'Item 1',
        description: 'Item 1 description',
        price: 100,
        category: 'Category 1',
        image: 'https://via.placeholder.com/150',
        date: new Date('2021-12-31')
    },
    {
        id: 2,
        name: 'Item 2',
        description: 'Item 2 description',
        price: 200,
        category: 'Category 2',
        image: 'https://via.placeholder.com/150',
        date: new Date('2021-12-20')
    },
    {
        id: 3,
        name: 'Item 3',
        description: 'Item 3 description',
        price: 300,
        category: 'Category 3',
        image: 'https://via.placeholder.com/150',
        date: new Date('2021-12-10')
    }
]