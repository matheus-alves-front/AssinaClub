import type { NextApiRequest, NextApiResponse } from 'next'
import { Subscriber } from '../../../../@types/SubscriberTypes'
import { createSubscriberRelation, removeSubscriberRelation } from '../../../../prisma/signaturesRelation'
import { createRouter } from 'next-connect';
import validateSubscriberExistence from '../../../../middleware/validateSubscriberExistence';
import { signatureUpdateSchema } from '../../schemas/signatureSchema';
import validateErrorsInSchema from '../../../../middleware/validateErrosInSchema';

const updateSubscriberRouter = createRouter<NextApiRequest, NextApiResponse>();

updateSubscriberRouter
    .use(validateSubscriberExistence)
    .use(async (req, res, next) => {
        return validateErrorsInSchema(req, res, next, signatureUpdateSchema)
    }
    )
    .post(async (req, res) => {
        const subscriberId = req.query.subscriberId as string
        const {
            isPaid,
            clubAssinatureId,
            planIds,
            unsubscribe
        }: Subscriber = req.body
        try {
            if (unsubscribe && isPaid) {
                removeSubscriberRelation(subscriberId, clubAssinatureId, planIds as string)

                return res.status(201).json({
                    message: "Signature Removed"
                })
            }
            if (isPaid) {
                await createSubscriberRelation(subscriberId, clubAssinatureId, planIds as string)

                return res.status(201).json({
                    message: "Signature Completed"
                })
            }
            if (!isPaid) {
                return res.status(400).json({
                    message: "Signature isn't paid"
                })
            }

        } catch (err) {
            console.error(err)
            return res.status(500)
        }
    })

export default updateSubscriberRouter.handler({
    onError: (err: any, _, res) => {
        res.status(500).json({
            message: "Something broke!"
        });
    },
    onNoMatch: (_, res) => {
        res.status(404).json({
            message: "Page is not found"
        });
    },
});