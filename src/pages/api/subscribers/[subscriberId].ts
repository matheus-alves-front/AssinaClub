import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SubscriberType, Subscriber } from '../../../@types/SubscriberTypes'

import { getSubscriber } from '../../../prisma/subscribers'

const prisma = new PrismaClient()

export default async function updateUser(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { method } = req
    const subscriberId = String(req.query.subscriberId)

    if (method === "GET") {
        const user = await getSubscriber(subscriberId)

        return res.status(200).json({
            data: user
        })

    } else if (method === "PUT") {
        const {
            name,
            cpf,
            birthDate,
            email,
            password,
            signatures
        }: Subscriber = req.body

        const user = await prisma.subscriber.update({
            where: { id: subscriberId },
            data: {
                name,
                cpf,
                birthDate,
                email,
                password,
                signatures
            }
        })

        return res.status(201).json({
            data: user,
            message: "update success"
        })

    } else if (method === "DELETE") {

        await prisma.subscriber.delete({
            where: { id: subscriberId }
        })

        return res.status(201).json({
            message: "Account Deleted",
        })
    }
}