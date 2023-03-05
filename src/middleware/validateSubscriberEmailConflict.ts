import { NextApiRequest, NextApiResponse } from "next"
import { Request, Response } from "express-serve-static-core"
import { SubscriberType } from "../@types/SubscriberTypes"
import { prisma } from "../prisma/PrismaClient"
import { NextHandler } from "next-connect"

export async function validateSubscriberEmailConflict(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>,
    next: NextHandler
) {
    if(!req.body) return next()

    const { email } = req.body

    try {
        const emailInUse = await prisma.subscriber.findUnique({
            where: {
                email
            }
        })
        if (emailInUse) return res.status(409).json({
            message: "Email already in use"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
    next()
}
