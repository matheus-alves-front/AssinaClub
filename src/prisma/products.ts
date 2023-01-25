import { PrismaClient } from '@prisma/client'
import { NextApiResponse } from 'next'

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

export async function checkIfProductExists(ProductId: string) {
    const product = await getProduct(ProductId)    

    if (!product) return false

    return true
}