import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import { ValidationErrorItem } from '@hapi/joi';

import { ClubProviderType, ClubProvider } from '../../../@types/ClubProviderTypes'
import { getClubProviders, validateClubProviderConflict } from '../../../prisma/clubProviders'

import { prisma } from '../../../prisma/PrismaClient'
import { clubProviderRegisterSchema } from '../schemas/clubProviderSchema';
import validateErrorsInSchema from '../../../utils/validateErrosInSchema';

export default async function handleClubProviders(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "GET") {
        const clubProviders = await getClubProviders()

        return res.status(200).json({
            data: clubProviders.reverse(),
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

        if (validateErrorsInSchema(clubProviderRegisterSchema, req, res) !== 'ok') return

        const hashedPassword = await bcrypt.hash(password, 10)

        const clubProviderCreation = {
            data: {
                clubName,
                hostName,
                cpf,
                cnpj,
                password: hashedPassword,
                email,
                description
            }
        }

        if (await validateClubProviderConflict(clubName, email, res) !== 'ok') return

        else {
            const clubProvider = await prisma.clubProvider.create(clubProviderCreation)

            return res.status(201).json({
                data: clubProvider,
            })
        }
    }
    return res.status(404).json({ message: 'Route not found.' })
}
