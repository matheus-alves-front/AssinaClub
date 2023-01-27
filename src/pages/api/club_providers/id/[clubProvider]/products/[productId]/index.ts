import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductType, Product } from '../../../../../../../@types/ProductTypes'
import { checkIfProductExists, getProduct } from '../../../../../../../prisma/products'
import { checkIfClubProviderExists } from '../../../../../../../prisma/clubProviders'

import { prisma } from '../../../../../../../prisma/PrismaClient'

export default async function handleProduct(
    req: NextApiRequest,
    res: NextApiResponse<ProductType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)
    const productId = String(req.query.productId)

    if (!await checkIfClubProviderExists(clubProviderId) || !await checkIfProductExists(productId)) {
        return res.status(404).json({
            message: "Product or Provider not found!"
        })
    }

    if (method === "GET") {

        const product = await getProduct(productId)

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
