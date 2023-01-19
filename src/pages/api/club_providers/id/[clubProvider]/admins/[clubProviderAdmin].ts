// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { AdminType, Admin } from '../../../../../../@types/AdminsClubProviderTypes'
import { getAdmin, ClubProviderExists } from '../../../../../../prisma/adminsClubProviders'

const prisma = new PrismaClient()

export default async function handleProductsOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<AdminType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)
    const clubProviderAdmin = String(req.query.clubProviderAdmin)

    await prisma.$connect()

    const isClubProviderExists = await ClubProviderExists(clubProviderId)
    const isAdminExists = await getAdmin(clubProviderAdmin)

    if (!isClubProviderExists) {
      return res.status(401).json({
        message: "Club Provider Don't exists"
      })
    }

    if (!isAdminExists) {
      return res.status(401).json({
        message: "Admin Don't exists"
      })
    }

    if (method === "GET") {
        const admin = await getAdmin(clubProviderAdmin)
    
        return res.status(200).json({
            data: admin,
        })
    } else if (method === "PUT") {
        const {
            name, 
            birthDate,
            email,
            password,
            occupation,
        }: Admin = req.body

        const admin = await prisma.admin.update({
          where: {
            id: clubProviderAdmin
          },
          data: {
            name,
            birthDate,
            email,
            password,
            occupation
          }
        });


        return res.status(201).json({
            data: admin,
        })
    } else if (method === "DELETE") {
      await prisma.admin.delete({
          where: { id: clubProviderAdmin }
      })

      return res.status(201).json({
          message: "Account Deleted",
      })
  }

    return res.status(404).json({message: 'Route not found.'})
}
