import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { Admin } from "../@types/AdminsClubProviderTypes"
import { getAdmin } from "../prisma/adminsClubProviders"

type CustomRequest = NextApiRequest & {
    locals: {
        admin: Admin
    } 
}

export default async function validateAdminExistence(
    req: CustomRequest,
    res: NextApiResponse,
    next: NextHandler,
) {
    const clubProviderAdmin = req.query.clubProviderAdmin as string

    const admin = await getAdmin(clubProviderAdmin)

    if (!admin) {
        return res.status(404).json({
            message: "Admin not found!"
        })
    }

    req.locals = {
        admin
    }
    
    next()
}