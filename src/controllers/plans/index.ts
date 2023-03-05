import { NextApiRequest, NextApiResponse } from "next"
import { getPlans } from "../../prisma/plans"
import { prisma } from "../../prisma/PrismaClient"
import { Request } from "express-serve-static-core"
import { getProduct } from "../../prisma/products"
import { createProductToPlanRelation, removeProductToPlanRelation } from "../../prisma/plansProductRelation"

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

export async function handleGetPlan(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const plans = await getPlans(req.query.clubProvider as string)

    return res.status(200).json({
        data: plans.reverse()
    })
}

export async function handleGetPlans(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const plans = await getPlans(req.query.clubProvider as string)

    return res.status(200).json({
        data: plans.reverse()
    })
}

export async function handlePostPlans(
    req: CustomRequest,
    res: NextApiResponse
) {
    const { files: images } = req

    const imagesUrls = images.map(image => image.location)

    const plan = await prisma.plan.create({
        data: {
            ...req.body,
            clubProviderId: req.query.clubProvider as string,
            images: imagesUrls
        }
    });

    return res.status(201).json({
        data: plan
    })
}

export async function handlePutPlan(
    req: CustomRequest,
    res: NextApiResponse
) {
    const { removeProduct, productId } = req.body

    const planId = req.query.planId as string

    if (productId) {

        const product = await getProduct(productId)

        if (!product) {
            return res.status(404).json({
                message: `Product not found`
            })
        }

        if (removeProduct) {
            removeProductToPlanRelation(productId, planId)
            return res.status(201).json({
                message: `Product Removed from Plan ${product?.name}`
            })
        }

        createProductToPlanRelation(productId, planId)
        return res.status(201).json({
            message: `Product Added to Plan ${product?.name}`
        })
    }

    const plan = await prisma.plan.update({
        where: {
            id: planId
        },
        data: {
            ...req.body
        }
    });

    return res.status(201).json({
        data: plan
    })
}

export async function handleDeletePlan(
    req: CustomRequest,
    res: NextApiResponse
) {
    try {
        await prisma.plan.delete({
            where: { id: req.query.planId as string }
        })
    
        return res.status(201).json({
            message: "Plan Deleted",
        })
    } catch (error) {
        
    }
}
