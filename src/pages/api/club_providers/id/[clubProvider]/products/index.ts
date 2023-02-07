import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductType, Product } from '../../../../../../@types/ProductTypes'
import { getProducts } from '../../../../../../prisma/products'
import { checkIfClubProviderExists } from '../../../../../../prisma/clubProviders'

import { prisma } from '../../../../../../prisma/PrismaClient'

export default async function handleProducts(
    req: NextApiRequest,
    res: NextApiResponse<ProductType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)

    if (!await checkIfClubProviderExists(clubProviderId)) return res.status(404).json({
        message: "Provider not found!"
    })

    if (method === "GET") {
        const products = await getProducts(clubProviderId)

        const { planId } = req.query

        if(planId) {
            const filteredProducts = products.filter(product => product.plansId.includes(String(planId)))
            
            return res.status(200).json({
                data: filteredProducts,
            })
        }

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

    else if (method === "DELETE") {

        await prisma.product.deleteMany({
            where: {
                clubProviderId
            }
        })

        return res.status(200).json({
            message: "Products deleted with sucess!"
        })
    }

    return res.status(404).json({
        message: 'Route not found.'
    })
} 
