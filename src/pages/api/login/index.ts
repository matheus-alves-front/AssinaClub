import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid"

import { prisma } from '../../../prisma/PrismaClient';
import { LoginType, LoginRequest } from '../../../@types/LoginType';
import { loginAttemptSchema } from '../schemas/loginSchema';
import { ValidationErrorItem } from '@hapi/joi';

export default async function handleClubProviders(
    req: NextApiRequest,
    res: NextApiResponse<LoginType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "POST") {

        const {
            email,
            password
        }: LoginRequest = req.body

        const validated = loginAttemptSchema.validate(req.body, { abortEarly: false })

        try {
            if (validated?.error) {
                const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

                return res.status(422).json({
                    message: detailedErros
                })
            }
            const subscriber = await prisma.subscriber.findMany({
                where: {
                    email: email
                }
            })

            const hashedPassword = bcrypt.compareSync(password, subscriber[0].password)

            if (!hashedPassword) return res.status(401).json({
                data: null,
            })

            const hastoken = await prisma.subscriberToken.findUnique({
                where: {
                    subscriberId: subscriber[0].id,
                }
            })

            if(!hastoken) {

                const token = uuidv4()

                const subscriberToken = {
                    subscriberId: subscriber[0].id,
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

    return res.status(404).json({ message: 'Route not found.' })
}
