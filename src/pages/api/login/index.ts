import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid"
import { ValidationErrorItem } from '@hapi/joi';

import { LoginRequest, LoginType } from '../../../@types/LoginType';

import { prisma } from '../../../prisma/PrismaClient';
import { loginAttemptSchema } from '../schemas/loginSchema';

export default async function handleClubProviders(
    req: NextApiRequest,
    res: NextApiResponse<LoginType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "POST") {

        const {
            email,
            password,
            typeOfUser
        }: LoginRequest = req.body

        const validated = loginAttemptSchema.validate(req.body, { abortEarly: false })   

        if (typeOfUser === "subscriber") await loginSubscriber(validated, res, email, password)

        else if (typeOfUser === "clubProvider") await loginClubProvider(validated, res, email, password)
    }
}

async function loginSubscriber(validated: any, res: any, email: any, password: any) {

    try {
        if (validated?.error) {
            const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

            return res.status(422).json({
                message: detailedErros
            })
        }
        const subscriber = await prisma.subscriber.findUnique({
            where: {
                email: email
            }
        })

        if(!subscriber) return res.status(404).json({
            message: "No subscriber found"
        })

        const hashedPassword = bcrypt.compareSync(password, subscriber.password)

        if (!hashedPassword) return res.status(404).json({
            message: "No subscriber found"
        })

        const hastoken = await prisma.subscriberToken.findUnique({
            where: {
                subscriberId: subscriber.id,
            }
        })

        if (!hastoken) {

            const token = uuidv4()

            const subscriberToken = {
                subscriberId: subscriber.id,
                token
            }

            await prisma.subscriberToken.create({
                data: subscriberToken
            })

            return res.status(200).json({
                data: subscriberToken
            })
        }

        return res.status(200).json({
            data: hastoken
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "An error occurred trying to login",
        })
    }
}

async function loginClubProvider(validated: any, res: any, email: any, password: any) {

    try {
        if (validated?.error) {
            const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

            return res.status(422).json({
                message: detailedErros
            })
        }
        
        const clubProvider = await prisma.clubProvider.findUnique({
            where: {
                email: email
            }
        })

        if (!clubProvider) return res.status(404).json({
            message: "No user found with this data."
        })

        const hashedPassword = bcrypt.compareSync(password, clubProvider.password)

        if (!hashedPassword) return res.status(404).json({
            message: "No user found with this data."
        })

        const hastoken = await prisma.clubProviderToken.findUnique({
            where: {
                clubProviderId: clubProvider.id,
            }
        })

        if (!hastoken) {

            const token = uuidv4()

            const clubProviderToken = {
                clubProviderId: clubProvider.id,
                token
            }

            await prisma.clubProviderToken.create({
                data: clubProviderToken
            })

            return res.status(200).json({
                data: clubProviderToken
            })
        }

        return res.status(200).json({
            data: hastoken
        })

    } catch (err) {
        console.log(err)
        
        return res.status(500).json({
            message: "An error occurred trying to login",
        })
    }
}
