// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PlansType, Plan } from '../../../../../../@types/PlansTypes'
import { ClubProviderExists } from '../../../../../../prisma/adminsClubProviders'
import { getPlans } from '../../../../../../prisma/plans'

const prisma = new PrismaClient()

export default async function handlePlansOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<PlansType>
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
        const plans = await getPlans(clubProviderId)
    
        return res.status(200).json({
            data: plans,
        })
    } else if (method === "POST") {
        const {
            title, 
            description,
            price,
            deliveryFrequency
        }: Plan = req.body

        const plan = await prisma.plan.create({
          data: {
            title, 
            description,
            price,
            deliveryFrequency,
            clubProviderId
          }
        });

        return res.status(201).json({
            data: plan,
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
