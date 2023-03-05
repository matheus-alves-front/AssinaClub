import { NextApiRequest, NextApiResponse } from "next"
import { getOption, getOptions } from "../../prisma/options"
import { prisma } from "../../prisma/PrismaClient"
import { getProduct } from "../../prisma/products"
import { Request } from "express-serve-static-core"

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

export async function handleGetOption(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const option = await getOption(req.query.optionId as string)
    if (!option) {
        return res.status(404).json({
            message: "Option not found!"
        })
    }
    return res.status(200).json({
        data: option
    })
}


export async function handleGetOptions(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const options = await getOptions(req.query.productId as string)
    return res.status(200).json({
        data: options.reverse()
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

export async function handlePutOption(
    req: CustomRequest,
    res: NextApiResponse
) {
    const { files: images } = req
    try {
        await prisma.option.update({
            where: { id: req.query.optionId as string },
            data: {
                ...req.body,
                images: images.map(image => image.location)
            }
        })
        return res.status(200).json({
            message: "Updated option with success!"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handleDeleteOption(
    req: CustomRequest,
    res: NextApiResponse
) {
    try {
        await prisma.option.delete({
            where: { id: req.query.optionId as string }
        })
        return res.status(201).json({
            message: "Option deleted with success!",
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}
