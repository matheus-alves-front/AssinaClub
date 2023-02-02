import type { NextApiRequest, NextApiResponse } from 'next'

import { Option, OptionType } from '../../../../../../../../@types/OptionTypes'

import { checkIfClubProviderExists } from '../../../../../../../../prisma/clubProviders'
import { getOption } from '../../../../../../../../prisma/options'
import { checkIfProductExists } from '../../../../../../../../prisma/products'

import { prisma } from '../../../../../../../../prisma/PrismaClient'

export default async function handleOption(
    req: NextApiRequest,
    res: NextApiResponse<OptionType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)
    const productId = String(req.query.productId)
    const optionId = String(req.query.optionId)    

    if (!await checkIfClubProviderExists(clubProviderId) || !await checkIfProductExists(productId)) {
        return res.status(404).json({
            message: "Product or Provider not found!"
        })
    }

    const option = await getOption(optionId)

    if (!option) {
        return res.status(404).json({
            message: "Option not found!"
        })
    }
    
    if (method === "GET") {

        return res.status(200).json({
            data: option
        })

    } else if (method === "PUT") {
        
        const {
            title,
            options
        }: Option = req.body

        await prisma.option.update({
            where: { id: optionId },
            data: {
                title,
                options
            }
        })

        return res.status(200).json({
            message: "Updated option with success!"
        })

    } else if (method === "DELETE") {

        await prisma.option.delete({
            where: { id: optionId }
        })

        return res.status(201).json({
            message: "Option deleted with success!",
        })
    }
}