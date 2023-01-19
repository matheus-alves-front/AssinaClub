import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getProducts(ClubProviderId: string ) {
    const products = await prisma.product.findMany({
        where: {
            clubProviderId: ClubProviderId
        }
    })

    return products
}

export async function getProduct(ProductId: string) {
    const product = await prisma.product.findUnique({
        where: {
            id: ProductId
        }
    })     

    return product
}