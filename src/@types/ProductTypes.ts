export type Product = {
    id: string | string[]
    name: string
    description: string
    sku: string
    value: number
    clubProviderId: string
}

export type ProductType = {
    data?: Product[] | Product | null
    message?: string
}