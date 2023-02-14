export type LoginResponse = {
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