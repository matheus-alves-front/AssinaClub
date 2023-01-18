export type ClubProvider = {
    id: string | string[]
    clubName: string
    hostName: string
    cpf: string
    cnpj: string
    creationDate: Date
    email: string
    password: string
    description: string
    subscribers: []
}

export type ClubProviderType = {
    data?: ClubProvider[] | ClubProvider | null
    message?: string
}