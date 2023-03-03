export type ClubProvider = {
    id: string 
    clubName: string
    hostName: string
    cpf: string
    cnpj: string
    creationDate: string
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