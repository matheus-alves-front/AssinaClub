import {Option} from './OptionTypes'

export type Product = {
    id: string | string[]
    name: string
    description: string
    sku: string
    value: number
    clubProviderId: string
    plansId: string[]
    additionalOptions?: Option[]
}

export type ProductType = {
    data?: Product[] | Product | null
    message?: string
}