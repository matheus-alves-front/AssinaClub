import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getOptions(ProductId: string ) {
    const options = await prisma.option.findMany({
        where: {
            productId: ProductId
        }
    })

    return options
}

export async function getOption(OptionId: string) {
    const option = await prisma.option.findUnique({
        where: {
            id: OptionId
        }
    })     
    return option
}