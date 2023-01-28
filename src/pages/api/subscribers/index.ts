import type { NextApiRequest, NextApiResponse } from 'next'
import { ValidationErrorItem } from '@hapi/joi';

import { SubscriberType, Subscriber } from '../../../@types/SubscriberTypes'
import { getSubscribers } from '../../../prisma/subscribers'

import { prisma } from '../../../prisma/PrismaClient'

import bcrypt from "bcrypt"
import { subscriberRegisterSchema } from '../schemas/subscriberSchema'

export default async function handleSubscribers(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "GET") {
        const subscribers = await getSubscribers()

        return res.status(200).json({
            data: subscribers.reverse(),
        })
    } else if (method === "POST") {
        const {
            name,
            cpf,
            birthDate,
            email,
            password
        }: Subscriber = req.body

        const subscriberCreation = {
            data: {
                name,
                cpf,
                birthDate,
                email,
                password: bcrypt.hashSync(password, 10)
            }
        }

        const validated = subscriberRegisterSchema.validate(subscriberCreation.data, { abortEarly: false })

        if (validated?.error) {
            const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

            return res.status(422).json({
                message: detailedErros
            })
        }

        const emailInUse = await prisma.subscriber.findUnique({
            where: {
                email: email
            }
        })

        if (emailInUse) return res.status(409).json({
            message: "Email already in use"
        })

        const subscriber = await prisma.subscriber.create(subscriberCreation)

        return res.status(201).json({
            data: subscriber,
        })
    }

    return res.status(404).json({ message: 'Route not found.' })
}
