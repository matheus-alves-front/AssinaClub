import type { NextApiRequest, NextApiResponse } from 'next'

import { ClubProviderType, ClubProvider } from '../../../@types/ClubProviderTypes'
import { getClubProviders } from '../../../prisma/clubProviders'

import { prisma } from '../../../prisma/PrismaClient'

export default async function handleClubProviders(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "GET") {
        const clubProviders = await getClubProviders()

        return res.status(200).json({
            data: clubProviders,
        })
    } else if (method === "POST") {
        const {
            clubName,
            hostName,
            cpf,
            cnpj,
            email,
            password,
            description
        }: ClubProvider = req.body

        const clubProvider = await prisma.clubProvider.create({
            data: {
                clubName,
                hostName,
                cpf,
                cnpj,
                email,
                password,
                description
            }
        })

        return res.status(201).json({
            data: clubProvider,
        })
    }

    return res.status(404).json({ message: 'Route not found.' })
}
