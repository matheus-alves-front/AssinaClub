export type Data = {
  id: string
  name: string
  email: string
}

export type DataType = {
  data?: Data[] | Data
  message?: string
}