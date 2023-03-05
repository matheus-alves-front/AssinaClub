import { NextApiRequest, NextApiResponse } from "next"
import { Product } from "../../@types/ProductTypes"
import { prisma } from "../../prisma/PrismaClient"
import { getProducts } from "../../prisma/products"

type CustomRequest = NextApiRequest & {
    files: {
        location: string
    }[]
}

export async function handleGetProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const clubProviderId = req.query.clubProvider as string

    const { planId } = req.query

    const products = await getProducts(clubProviderId)

    if (planId) {
        const filteredProducts = products.filter(product => product.plansId.includes(planId as string))

        return res.status(200).json({
            data: filteredProducts.reverse()
        })
    }

    return res.status(200).json({
        data: products.reverse()
    })
}

export async function handlePostProducts(
    req: CustomRequest,
    res: NextApiResponse
) {
    try {
        const product = await prisma.product.create({
            data: {
                ...req.body,
                clubProviderId: req.query.clubProvider as string,
                images: req.files.map(file => file.location)
            }
        })

        return res.status(201).json({
            data: product,
            message: "Product created with sucess!"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handleDeleteProducts(
    req: CustomRequest,
    res: NextApiResponse
) {
    try {
        await prisma.product.deleteMany({
            where: {
                clubProviderId: req.query.clubProvider as string
            }
        })

        return res.status(200).json({
            message: "Products deleted with sucess!"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}
