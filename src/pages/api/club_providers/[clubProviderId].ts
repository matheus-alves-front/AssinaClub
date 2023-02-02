import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import { ClubProviderType, ClubProvider } from '../../../@types/ClubProviderTypes'

import { checkIfClubProviderExists, getClubProvider, validateClubProviderConflict } from '../../../prisma/clubProviders'
import { removeSubscriberRelationByClubProvider } from '../../../prisma/signaturesRelation'
import { prisma } from '../../../prisma/PrismaClient'
import { deleteAllClubProviderAdmins } from '../../../prisma/adminsClubProviders'

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

        if (await validateClubProviderConflict(clubName, email, res) !== 'ok') return

        let hashedPassword

        if (password) hashedPassword = bcrypt.hashSync(password, 10)

        const clubProvider = await prisma.clubProvider.update({
            where: { id: clubProviderId },
            data: {
                clubName,
                hostName,
                cpf,
                cnpj,
                email,
                password: hashedPassword,
                description
            }
        })

        if (removeSubscriber) {
            removeSubscriberRelationByClubProvider(clubProviderId, removeSubscriber)

            return res.status(201).json({
                message: "Subscriber Remove Success"
            })
        }

        return res.status(201).json({
            data: clubProvider,
            message: "update success"
        })

    } else if (method === "DELETE") {

        if (!(await deleteAllClubProviderAdmins(clubProviderId))) {
            return res.status(500).json({
                message: "Error while deleting all admins"
            })
        } else {
            await prisma.clubProvider.delete({
                where: { id: clubProviderId }
            })
    
            return res.status(201).json({
                message: "Account Deleted",
            })
        }
    }
}