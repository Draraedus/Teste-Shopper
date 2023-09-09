export type ProductsCsv = {
    code: number
    new_price: number
}

export type Products = {
    code: number
    name: string
    cost_price: number
    sales_price: number
}

export type ProductsUpdate = {
    code: number
    sales_price: number
}

export type Packs = {
    id: number
    pack_id: number
    product_id: number
    qty: number
}

export type ProductsAllInformation = {
    new_value : ProductsCsv
    productItem: Products | undefined
    productPack: Products | undefined
    pack: Packs | undefined
}