export type Subscriber = {
  id: string | string[]
  name: string
  cpf: string
  birthDate: string
  email: string
  password: string
  signatures: string[]
}

export type SubscriberType = {
  data?: Subscriber[] | Subscriber | null
  message?: string
}