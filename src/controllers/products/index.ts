import { NextApiRequest, NextApiResponse } from "next"
import { Product } from "../../@types/ProductTypes"
import { prisma } from "../../prisma/PrismaClient"
import { getProducts } from "../../prisma/products"

type CustomRequest = NextApiRequest & {
    files: {
        location: string
    }[]
}

export async function handleGetProducts(req: NextApiRequest, res: NextApiResponse) {

    const clubProviderId = String(req.query.clubProvider)

    const products = await getProducts(clubProviderId)

    const { planId } = req.query

    if (planId) {
        const filteredProducts = products.filter(product => product.plansId.includes(String(planId)))

        return res.status(200).json({
            data: filteredProducts.reverse(),
        })
    }

    return res.status(200).json({
        data: products.reverse(),
    })
}

export async function handlePostProducts(req: CustomRequest, res: NextApiResponse) {

    const clubProviderId = String(req.query.clubProvider)

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
            clubProviderId,
            images: req.files.map(file => file.location)
        }
    })

    return res.status(201).json({
        data: product,
        message: "Product created with sucess!"
    })
}

export async function handleDeleteProducts(req: CustomRequest, res: NextApiResponse) {

    const clubProviderId = String(req.query.clubProvider)

    await prisma.product.deleteMany({
        where: {
            clubProviderId
        }
    })

    return res.status(200).json({
        message: "Products deleted with sucess!"
    })
}
