export type Plan = {
  title: string
  description: string
  price: number
  deliveryFrequency: number

  // relations
  memberOfPlans?: string
  productId: string[]
  removeProduct?: boolean
  clubProviderId: string
}

export type PlansType = {
  data?: Plan[] | Plan | null
  message?: string
}