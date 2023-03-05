import { NextApiRequest, NextApiResponse } from "next"
import { SubscriberType } from "../../@types/SubscriberTypes"
import { getSubscriber } from "../../prisma/subscribers"
import bcrypt from 'bcrypt'
import { prisma } from "../../prisma/PrismaClient"
import { Request } from "express-serve-static-core"

type CustomRequest = NextApiRequest & Request & {
    file: {
        location: string
    }
}

export async function handleGetSubscriber(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const subscriberId = req.query.subscriberId as string
    const subscriber = await getSubscriber(subscriberId)

    if (!subscriber) {
        return res.status(404).json({
            message: 'Subscriber does not exist'
        })
    }
    return res.status(200).json({
        data: subscriber
    })
}

export async function handleGetSubscribers(
    req: NextApiRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { clubProviderId } = req.query
    try {
        const subscribers = await prisma.subscriber.findMany({
            where: clubProviderId ? {
                clubProviderIds: {
                    has: clubProviderId as string
                }
            } : {}
        })
        return res.status(200).json({
            data: subscribers.reverse()
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handlePostSubscribers(
    req: CustomRequest,
    res: NextApiResponse<SubscriberType>
) {
    const { password } = req.body
    const { file } = req
    try {
        const subscriber = await prisma.subscriber.create({
            data: {
                ...req.body,
                password: bcrypt.hashSync(password, 10),
                image: file.location
            }
        })

        return res.status(201).json({
            data: subscriber
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handlePutSubscriber(
    req: CustomRequest,
    res: NextApiResponse<SubscriberType>
) {
    req.body = !!req.body.body ? JSON.parse(req.body.body) : {}

    const { password } = req.body
    const { file } = req

    try {
        const subscriber = await prisma.subscriber.update({
            where: { id: req.query.subscriberId as string },
            data: {
                ...req.body,
                password: password ? bcrypt.hashSync(password, 10) : password,
                image: file ? file.location : file
            }
        })
        return res.status(201).json({
            data: subscriber,
            message: "update success"
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handleDeleteSubscriber(
    req: CustomRequest,
    res: NextApiResponse<SubscriberType>
) {
    try {
        await prisma.subscriber.delete({
            where: { id: req.query.subscriberId as string }
        })
        return res.status(201).json({
            message: "Account Deleted",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

