import { NextApiRequest, NextApiResponse } from "next"
import { Subscriber, SubscriberType } from "../../@types/SubscriberTypes"
import { getSubscribers } from "../../prisma/subscribers"
import bcrypt from 'bcrypt'
import { prisma } from "../../prisma/PrismaClient"

type CustomRequest = NextApiRequest & {
    file: {
        location: string
    }
}

export async function handleGetSubscribers(req: NextApiRequest, res: NextApiResponse<SubscriberType>) {
    const subscribers = await getSubscribers()

    const { clubProviderId } = req.query

    if (clubProviderId) {
        const filteredSubs = subscribers.filter(subscriber => subscriber.clubProviderIds.includes(String(clubProviderId)))
        return res.status(200).json({
            data: filteredSubs.reverse(),
        })
    }
    return res.status(200).json({
        data: subscribers.reverse(),
    })
}

export async function handlePostSubscribers(req: NextApiRequest, res: NextApiResponse<SubscriberType>) {
    const {
        name,
        cpf,
        birthDate,
        email,
        password
    }: Subscriber = req.body

    const { file } = req as CustomRequest

    const subscriberCreation = {
        data: {
            name,
            cpf,
            birthDate,
            email,
            password: bcrypt.hashSync(password, 10),
            image: file.location
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
