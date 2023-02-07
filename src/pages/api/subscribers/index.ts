import type { NextApiRequest, NextApiResponse } from 'next'
import { ValidationErrorItem } from '@hapi/joi';

import { SubscriberType, Subscriber } from '../../../@types/SubscriberTypes'
import { getSubscribers } from '../../../prisma/subscribers'

import { prisma } from '../../../prisma/PrismaClient'

import bcrypt from "bcrypt"
import { subscriberRegisterSchema } from '../schemas/subscriberSchema'
import validateErrorsInSchema from '../../../utils/validateErrosInSchema';

export default async function handleSubscribers(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { method } = req

    if (method === "GET") {
        const subscribers = await getSubscribers()

        const { clubProviderId } = req.query

        if(clubProviderId) {
            const filteredSubs = subscribers.filter(subscriber => subscriber.clubProviderIds.includes(String(clubProviderId)))

            return res.status(200).json({
                data: filteredSubs.reverse(),
            })
        }

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

        if (validateErrorsInSchema(subscriberRegisterSchema, req, res) !== 'ok') return

        const subscriberCreation = {
            data: {
                name,
                cpf,
                birthDate,
                email,
                password: bcrypt.hashSync(password, 10)
            }
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
