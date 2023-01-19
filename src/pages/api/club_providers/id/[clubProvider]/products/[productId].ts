import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductType, Product } from '../../../../../../@types/ProductTypes'
import { getProduct } from '../../../../../../prisma/products'
import { getClubProvider } from '../../../../../../prisma/clubProviders'

const prisma = new PrismaClient()

export default async function updateProduct(
    req: NextApiRequest,
    res: NextApiResponse<ProductType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)
    const productId = String(req.query.productId)

    const clubProviderExists = await getClubProvider(clubProviderId)

    if (!clubProviderExists) return res.status(401).json({
        message: "ClubProvider not valid!"
    })

    const product = await getProduct(productId)

    if (!product) return res.status(404).json({
        message: "Product was not found!"
    })

    if (method === "GET") {

        return res.status(200).json({
            data: product
        })

    } else if (method === "PUT") {

        const {
            name,
            description,
            sku,
            value
        }: Product = req.body

        const productUpdated = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                sku,
                value
            }
        })

        return res.status(201).json({
            data: productUpdated,
            message: "Product updated with success!"
        })

    } else if (method === "DELETE") {

        await prisma.product.delete({
            where: { id: productId }
        })

        return res.status(200).json({
            message: "Product deleted with sucess!",
        })
    }
}