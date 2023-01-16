export type User = {
  id: string | string[]
  name: string
  cpf: string
  birthDate: string
  email: string
  password: string
  signatures: string[]
  isPaid: boolean
}

export type DataType = {
  data?: User[] | User
  message?: string
}