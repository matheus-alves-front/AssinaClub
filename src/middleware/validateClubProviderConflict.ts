import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../prisma/PrismaClient"

export async function validateClubProviderConflict(req: NextApiRequest, res: NextApiResponse, next: any) {    

    if (!['POST'].includes(String(req.method)) || !req?.body) return next()

    const { clubName, email } = req?.body

    try {
        if (clubName) {
            const clubNameInUse = await prisma.clubProvider.findUnique({
                where: { clubName }
            })

            if (clubNameInUse) return res.status(409).json({
                message: "ClubName already in use"
            })
        }

        if (email) {
            const clubEmailInUse = await prisma.clubProvider.findUnique({
                where: { email }
            })

            if (clubEmailInUse) return res.status(409).json({
                message: "Email already in use"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

    next()
}