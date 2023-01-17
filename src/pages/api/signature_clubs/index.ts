// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SubscriberType, Subscriber } from '../../../@types/SubscriberTypes'
import { getSubscribers } from '../../../prisma/subscribers'

const prisma = new PrismaClient()

export default async function handleUsers(
  req: NextApiRequest,
  res: NextApiResponse<SubscriberType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "GET") {
        const users = await getSubscribers()
    
        return res.status(200).json({
            data: users,
        })
    } else if (method === "POST") {
        const {
            name, 
            cpf,
            birthDate,
            email,
            password,
            signatures,
        }: Subscriber = req.body

        const user = await prisma.subscriber.create({
            data: {
                name, 
                cpf,
                birthDate,
                email,
                password,
                signatures,

            }
        })

        return res.status(201).json({
            data: user,
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
