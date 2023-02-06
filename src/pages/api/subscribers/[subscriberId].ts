import type { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from 'bcrypt'

import { SubscriberType, Subscriber } from '../../../@types/SubscriberTypes'

import { getSubscriber } from '../../../prisma/subscribers'
import { createSubscriberRelation, removeSubscriberRelation } from '../../../prisma/signaturesRelation'

import { prisma } from '../../../prisma/PrismaClient'

export default async function updateSubscriber(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { method } = req
    const subscriberId = String(req.query.subscriberId)

    if (method === "GET") {
        const subscriber = await getSubscriber(subscriberId)

        return res.status(200).json({
            data: subscriber
        })

    } else if (method === "PUT") {
        const {
            name,
            cpf,
            birthDate,
            email,
            password
        }: Subscriber = req.body

        const subscriberExists = await getSubscriber(subscriberId)

        if(!subscriberExists) return res.status(404).json({
            message: 'Subscriber does not exist'
        })

        const hashedPassword = bcrypt.hashSync(password, 10)

        const subscriber = await prisma.subscriber.update({
            where: { id: subscriberId },
            data: {
                name,
                cpf,
                birthDate,
                email,
                password: hashedPassword
            }
        })

        return res.status(201).json({
            data: subscriber,
            message: "update success"
        })

    } else if (method === "DELETE") {

        const subscriberExists = await getSubscriber(subscriberId)

        if(!subscriberExists) return res.status(404).json({
            message: 'Subscriber does not exist'
        })

        await prisma.subscriber.delete({
            where: { id: subscriberId }
        })

        return res.status(201).json({
            message: "Account Deleted",
        })
    }
}