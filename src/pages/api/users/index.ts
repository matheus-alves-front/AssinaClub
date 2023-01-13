// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { DataType, User } from '../../../@types/TemplateTypes'
import { getUsers } from '../../../prisma/users'

const prisma = new PrismaClient()

export default async function handleUsers(
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
            cpf,
            birthDate,
            email,
            password,
            signatures,
            isPaid
        }: User = req.body

        const user = await prisma.user.create({
            data: {
                name, 
                cpf,
                birthDate,
                email,
                password,
                signatures,
                isPaid
            }
        })

        return res.status(201).json({
            data: user,
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
