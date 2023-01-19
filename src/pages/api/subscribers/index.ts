// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SubscriberType, Subscriber } from '../../../@types/SubscriberTypes'
import { getSubscribers } from '../../../prisma/subscribers'

const prisma = new PrismaClient()

export default async function handleSubscribers(
  req: NextApiRequest,
  res: NextApiResponse<SubscriberType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "GET") {
        const subscribers = await getSubscribers()
    
        return res.status(200).json({
            data: subscribers,
        })
    } else if (method === "POST") {
        const {
            name, 
            cpf,
            birthDate,
            email,
            password
        }: Subscriber = req.body

        const subscriber = await prisma.subscriber.create({
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
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
