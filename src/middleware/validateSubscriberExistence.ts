import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { getSubscriber } from "../prisma/subscribers"

export default async function validateSubscriberExistence(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) {    
    if(!req?.query?.subscriberId) next()

    const subscriber = await getSubscriber(req.query.subscriberId as string)
    
    if (!subscriber) return res.status(404).json({
        message: 'Subscriber does not exist'
    })

    next()
}

