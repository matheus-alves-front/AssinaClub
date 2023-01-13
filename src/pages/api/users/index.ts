// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { DataType } from '../../../@types/TemplateTypes'
import { getUsers } from '../../../lib/users'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) {
    const { method } = req

    await prisma.$connect()

    if (method === "GET") {
        const users = await getUsers()
    
        return res.status(200).json({
            data: users,
        })
    } else if (method === "POST") {
        const {
            name, 
            email
        } = req.body

        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        })

        return res.status(201).json({
            data: user,
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
