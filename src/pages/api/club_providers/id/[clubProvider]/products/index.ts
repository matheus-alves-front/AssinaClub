// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductType, Product } from '../../../../../../@types/ProductTypes'
import { getProducts } from '../../../../../../prisma/products'
import { getClubProvider } from '../../../../../../prisma/clubProviders'

const prisma = new PrismaClient()

export default async function handleProducts(
    req: NextApiRequest,
    res: NextApiResponse<ProductType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)

    await prisma.$connect()

    const clubProviderExists = await getClubProvider(clubProviderId)

    if (!clubProviderExists) return res.status(401).json({
        message: "ClubProvider not valid!"
    })

    if (method === "GET") {
        const products = await getProducts(clubProviderId)

        return res.status(200).json({
            data: products,
        })

    } else if (method === "POST") {
        const {
            name,
            description,
            sku,
            value
        }: Product = req.body

        const product = await prisma.product.create({
            data: {
                name,
                description,
                sku,
                value,
                clubProviderId
            }
        })

        return res.status(201).json({
            data: product,
            message: "Product created with sucess!"
        })
    }

    return res.status(404).json({ 
        message: 'Route not found.' 
    })
}
