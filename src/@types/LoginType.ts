export type LoginResponse = {
    subscriberId?: string
    clubProviderId?: string
    token: string
}

export type LoginRequest = {
    email: string
    password: string
    typeOfUser: string
}

export type LoginType = {
    data?: LoginResponse | LoginRequest | null
    message?: string | string[]
}