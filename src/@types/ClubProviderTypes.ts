export type ClubProvider = {
    id: string | string[]
    clubName: string
    hostName: string
    cpf: string
    cnpj: string
    creationDate: String
    email: string
    password: string
    description: string
    subscribers?: string[]
    subscriberIds?: string[]
    removeSubscriber?: string
}

export type ClubProviderType = {
    data?: ClubProvider[] | ClubProvider | null
    message?: string | string[]
}