export type Subscriber = {
  id: string | string[]
  name: string
  cpf: string
  birthDate: string
  email: string
  password: string
  signatures?: string[]

  // For Signatures
  isPaid?: boolean
  unsubscribe?: boolean
  clubAssinatureId?: string
}

export type SubscriberType = {
  data?: Subscriber[] | Subscriber | null
  message?: string | string[]
}