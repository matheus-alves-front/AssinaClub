import type { NextApiRequest, NextApiResponse } from 'next'

import { SubscriberType, Subscriber } from '../../../../@types/SubscriberTypes'

import { getSubscriber } from '../../../../prisma/subscribers'
import { createSubscriberRelation, removeSubscriberRelation } from '../../../../prisma/signaturesRelation'


export default async function updateSubscriber(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { method } = req
    const subscriberId = String(req.query.subscriberId)

    if (method === "POST") {
        const {
            isPaid,
            clubAssinatureId,
            planIds,
            unsubscribe
        }: Subscriber = req.body

        try {
            const subscriberExists = await getSubscriber(subscriberId)

            if (!subscriberExists) return res.status(404).json({
                message: 'Subscriber does not exist'
            })

            if (!clubAssinatureId || !planIds) {
                return res.status(400).json({
                    message: "Missing planIds or clubAssinatureId"
                })
            }

            if (unsubscribe || !isPaid) {
                removeSubscriberRelation(subscriberId, clubAssinatureId, String(planIds))

                return res.status(201).json({
                    message: "Signature Removed"
                })
            }

            if (isPaid) {
                await createSubscriberRelation(subscriberId, clubAssinatureId, String(planIds))

                return res.status(201).json({
                    message: "Signature Completed"
                })
            }

            return res.status(201).json({
                message: "update no if"
            })
            
        } catch (err) {
            console.log(err)
            return res.status(500)
        }

    }
}