import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { Admin } from "../@types/AdminsClubProviderTypes"
import { prisma } from "../prisma/PrismaClient"

export async function validateEmailAdminConflict(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) {
    const { email }: Admin = req.body

    const emailInUse = await prisma.admin.findUnique({
        where: {
            email
        }
    })

    if (emailInUse) {
        return res.status(409).json({
            message: 'Email already in use by another admin'
        })
    }

    next()
}