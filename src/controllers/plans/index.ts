import { NextApiRequest, NextApiResponse } from "next"
import { Plan } from "../../@types/PlansTypes"
import { getPlans } from "../../prisma/plans"
import { prisma } from "../../prisma/PrismaClient"
import { Request } from "express-serve-static-core"

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

export async function handleGetPlans(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const clubProviderId = req.query.clubProvider as string

    const plans = await getPlans(clubProviderId)

    return res.status(200).json({
        data: plans.reverse()
    })
}

export async function handlePostPlans(
    req: CustomRequest,
    res: NextApiResponse
) {
    const clubProviderId = req.query.clubProvider as string

    const {
        title,
        description,
        price,
        deliveryFrequency
    }: Plan = JSON.parse(req.body.body)

    const { files: images } = req

    const imagesUrls = images.map(image => image.location)

    const plan = await prisma.plan.create({
        data: {
            title,
            description,
            price,
            deliveryFrequency,
            clubProviderId,
            images: imagesUrls
        }
    });

    return res.status(201).json({
        data: plan
    })
}
