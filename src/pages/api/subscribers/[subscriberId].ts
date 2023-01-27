import type { NextApiRequest, NextApiResponse } from 'next'

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
            password,
            isPaid,
            clubAssinatureId,
            unsubscribe
        }: Subscriber = req.body

        if (unsubscribe) {
            if (!clubAssinatureId) {
                return res.status(400).json({
                    message: "Missing ClubId"
                })
            }

            removeSubscriberRelation(subscriberId, clubAssinatureId)

            return res.status(201).json({
                message: "Signature Removed"
            })
        }

        if (isPaid) {
            if (!clubAssinatureId) {
                return res.status(400).json({
                    message: "Missing ClubId"
                })
            }
            
            createSubscriberRelation(subscriberId, clubAssinatureId)

            return res.status(201).json({
                message: "Signature Completed"
            })
        }

        const subscriber = await prisma.subscriber.update({
            where: { id: subscriberId },
            data: {
                name,
                cpf,
                birthDate,
                email,
                password
            }
        })

        return res.status(201).json({
            data: subscriber,
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