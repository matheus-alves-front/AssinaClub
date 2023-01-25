import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ClubProviderType, ClubProvider } from '../../../@types/ClubProviderTypes'

import { checkIfClubProviderExists, getClubProvider } from '../../../prisma/clubProviders'
import { removeSubscriberRelationByClubProvider } from '../../../prisma/signaturesRelation'

const prisma = new PrismaClient()

export default async function handleClubProvider(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProviderId)

    if (!await checkIfClubProviderExists(clubProviderId)) return res.status(404).json({
        message: "Provider not found!"
    })

    if (method === "GET") {
        const clubProvider = await getClubProvider(clubProviderId)

        return res.status(200).json({
            data: clubProvider
        })

    } else if (method === "PUT") {
        const {
            clubName,
            hostName,
            cpf,
            cnpj,
            email,
            password,
            description,
            removeSubscriber
        }: ClubProvider = req.body

        const clubProvider = await prisma.clubProvider.update({
            where: { id: clubProviderId },
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

        if (removeSubscriber) {
            removeSubscriberRelationByClubProvider(clubProviderId ,removeSubscriber)

            return res.status(201).json({
                message: "Subscriber Remove Success"
            })
        }

        return res.status(201).json({
            data: clubProvider,
            message: "update success"
        })

    } else if (method === "DELETE") {

        await prisma.clubProvider.delete({
            where: { id: clubProviderId }
        })

        return res.status(201).json({
            message: "Account Deleted",
        })
    }
}