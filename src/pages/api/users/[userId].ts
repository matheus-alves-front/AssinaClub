import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { DataType, User } from '../../../@types/TemplateTypes'

import { getUser } from '../../../prisma/users'

const prisma = new PrismaClient()

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) {
    const { method } = req
    const { userId } = req.query

    if (method === "GET") {
        const user = await getUser(userId)

        return res.status(200).json({
            data: user
        })
    } else if (method === "PUT") {
        const {
          name, 
          cpf,
          birthDate,
          email,
          password,
          signatures,
          isPaid
        }: User = req.body

        const user = await prisma.user.update({
            where: {id: userId},
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
            message: "update success"
        })
    } else if (method === "DELETE") {
        await prisma.user.delete({
            where: {id: userId }
        })

        return res.status(201).json({
            message: "Account Deleted",
        })
    }
}