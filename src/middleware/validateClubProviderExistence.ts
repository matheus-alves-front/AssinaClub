import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { getClubProvider } from "../prisma/clubProviders"

export default async function validateClubProviderExistence(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
    const clubProviderId = String(req.query.clubProvider)

    const clubProvider = await getClubProvider(clubProviderId)

    if (clubProvider) return next()
    else return res.status(404).json({
        message: "Provider not found!"
    })
}