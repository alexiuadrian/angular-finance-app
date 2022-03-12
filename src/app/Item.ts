export interface Item {
    id?: number; // ? means optional
    name: string; // name is required
    description: string; // description is required
    price: number; // price is required
    category: string; // category is required
    date: string; // date is required
    userId: string; // user is required
}