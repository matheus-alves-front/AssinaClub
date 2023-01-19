// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { AdminType, Admin } from '../../../../../../@types/AdminsClubProviderTypes'
import { getAdmins, ClubProviderExists } from '../../../../../../prisma/adminsClubProviders'

const prisma = new PrismaClient()

export default async function handleProductsOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<AdminType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)

    await prisma.$connect()

    const isClubProviderExists = await ClubProviderExists(clubProviderId)

    if (!isClubProviderExists) {
      return res.status(401).json({
        message: "Club Provider Don't exists"
      })
    }

    if (method === "GET") {
        const subscribers = await getAdmins(clubProviderId)
    
        return res.status(200).json({
            data: subscribers,
        })
    } else if (method === "POST") {
        const {
            name, 
            birthDate,
            email,
            password,
            occupation,
        }: Admin = req.body

        const admin = await prisma.admin.create({
          data: {
            name,
            birthDate,
            email,
            password,
            occupation,
            clubProviderId
          }
        });


        return res.status(201).json({
            data: admin,
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
