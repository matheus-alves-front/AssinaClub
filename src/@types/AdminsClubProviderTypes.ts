export type Admin = {
  name: string
  birthDate: string
  email: string
  password: string
  occupation: string
  clubProviderId: string
}

export type AdminType = {
  data?: Admin[] | Admin | null
  message?: string
}