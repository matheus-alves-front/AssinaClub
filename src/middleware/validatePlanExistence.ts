import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { Plan } from "../@types/PlansTypes"
import { getPlan } from "../prisma/plans"

type CustomRequest = NextApiRequest & {
    locals: {
        plan: Plan
    } 
}

export default async function validatePlanExistence(
    req: CustomRequest,
    res: NextApiResponse,
    next: NextHandler,
) {
    const planId = req.query.planId as string

    const plan = await getPlan(planId)

    if (!plan) {
        return res.status(404).json({
            message: "Plan not found!"
        })
    }

    req.locals = {
        plan
    }

    next()
}