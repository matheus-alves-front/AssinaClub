export type LoginResponse = {
    subscriberId: string
    token: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type LoginType = {
    data?: LoginResponse | LoginRequest | null
    message?: string | string[]
}