// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ValidationError, ValidationErrorItem } from '@hapi/joi'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';

import { ClubProviderType, ClubProvider } from '../../../@types/ClubProviderTypes'
import { getClubProviders } from '../../../prisma/clubProviders'

import { clubProviderRegisterSchema } from "../schemas/clubProviderSchema"

const prisma = new PrismaClient()

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

        const hashedPassword = await bcrypt.hash(password, 10)

        const clubProviderCreation = {
            data: {
                clubName,
                hostName,
                cpf,
                cnpj,
                password: hashedPassword,
                creationDate: new Date(dayjs(Date.now()).format('MM/DD/YYYY')),
                email,
                description
            }
        }

        const validated = clubProviderRegisterSchema.validate(clubProviderCreation.data, { abortEarly: false })

        if (validated?.error) {
            const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

            return res.status(422).json({
                message: detailedErros
            })
        }

        const clubNameInUse = await prisma.clubProvider.findUnique({
            where: {
                clubName: clubName
            }
        })

        if (clubNameInUse) return res.status(409).json({
            message: "ClubName already in use"
        })

        const clubProvider = await prisma.clubProvider.create(clubProviderCreation)

        return res.status(201).json({
            data: clubProvider,
        })
    }

    return res.status(404).json({ message: 'Route not found.' })
}
