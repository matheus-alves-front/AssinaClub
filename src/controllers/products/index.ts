import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../prisma/PrismaClient"
import { getProduct, getProducts } from "../../prisma/products"

type CustomRequest = NextApiRequest & {
    files: {
        location: string
    }[]
}

export async function handleGetProduct(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const productId = req.query.productId as string
    const product = await getProduct(productId)
    if (!product) {
        return res.status(404).json({
            message: "Product or Provider not found!"
        })
    }
    return res.status(200).json({
        data: product
    })
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

export async function handlePutProduct(
    req: CustomRequest,
    res: NextApiResponse
) {
    const productId = req.query.productId as string
    try {
        const productUpdated = await prisma.product.update({
            where: { id: productId },
            data: {
                ...req.body
            }
        })
        return res.status(201).json({
            data: productUpdated,
            message: "Product updated with success!"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handleDeleteProduct(
    req: CustomRequest,
    res: NextApiResponse
) {
    const productId = req.query.productId as string
    try {
        await prisma.product.delete({
            where: { id: productId }
        })

        return res.status(200).json({
            message: "Product deleted with sucess!",
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