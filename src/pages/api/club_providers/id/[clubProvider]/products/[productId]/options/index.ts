import type { NextApiRequest, NextApiResponse } from 'next'

import { Option, OptionType } from '../../../../../../../../@types/OptionTypes'

import { checkIfClubProviderExists } from '../../../../../../../../prisma/clubProviders'
import { getOptions } from '../../../../../../../../prisma/options'
import { checkIfProductExists, getProduct } from '../../../../../../../../prisma/products'

import { prisma } from '../../../../../../../../prisma/PrismaClient'

export default async function handleOptions(
    req: NextApiRequest,
    res: NextApiResponse<OptionType>
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

        const options = await getOptions(productId)

        return res.status(200).json({
            data: options
        })

    } else if (method === "POST") {

        const product = await getProduct(productId)

        if (!product) return

        const {
            title,
            options
        }: Option = req.body

        const option = await prisma.option.create({
            data: {
                title,
                options,
                productId
            }
        })

        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                additionalOptions: [...product.additionalOptions, option.id]
            }
        })

        return res.status(201).json({
            data: option,
            message: "Option created with success!"
        })
    } else if (method === "DELETE") {

        const deletedOptions = await prisma.option.deleteMany({
            where: {
                productId: productId
            }
        })

        if (deletedOptions.count === 0) return res.status(404).json({
            message: "This product doesn't have any options!"
        })

        return res.status(201).json({
            message: "All options were erased with success!"
        })
    }
}