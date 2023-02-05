export function getDataPrismaDateFormat(data: any) {
  const formatedData = JSON.stringify(data.map((item: any) => {
    item.creationDate = new Date(item.creationDate.toISOString())
    return item
  }))

  return JSON.parse(formatedData)
}

export function getDataObjectPrismaDateFormat(data: any) {
  data.creationDate = data.creationDate.toISOString()

  return data
}