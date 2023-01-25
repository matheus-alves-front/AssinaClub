export type Option = {
    id: string | string[]
    title: string
    options: string[]
}

export type OptionType = {
    data?: Option[] | Option | null
    message?: string
}