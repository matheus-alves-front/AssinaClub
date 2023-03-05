import { NextApiRequest, NextApiResponse } from "next"
import { getOptions } from "../../prisma/options"
import { prisma } from "../../prisma/PrismaClient"
import { getProduct } from "../../prisma/products"
import { Request } from "express-serve-static-core"

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

export async function handleGetOptions(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const options = await getOptions(req.query.productId as string)
    return res.status(200).json({
        data: options
    })
}

export async function handlePostOptions(
    req: CustomRequest,
    res: NextApiResponse
) {
    const productId = req.query.productId as string
    const product = await getProduct(productId)

    if (!product) return

    const { files: images } = req

    try {
        const option = await prisma.option.create({
            data: {
                ...req.body,
                productId,
                images: images.map(image => image.location)
            }
        })

        return res.status(201).json({
            data: option,
            message: "Option created with success!"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

