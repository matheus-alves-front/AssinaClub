// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PlansType, Plan } from '../../../../../../@types/PlansTypes'
import { ClubProviderExists } from '../../../../../../prisma/adminsClubProviders'
import { getPlan } from '../../../../../../prisma/plans'
import { createProductToPlanRelation, removeProductToPlanRelation } from '../../../../../../prisma/plansProductRelation'

const prisma = new PrismaClient()

export default async function handlePlansOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<PlansType>
) {
    const { method } = req
    const clubProviderId = String(req.query.clubProvider)
    const planId = String(req.query.planId)

    await prisma.$connect()

    const isClubProviderExists = await ClubProviderExists(clubProviderId)
    const plan = await getPlan(planId)

    if (!isClubProviderExists) {
      return res.status(401).json({
        message: "Club Provider Doesn't exists"
      })
    }

    if (!plan) {
      return res.status(401).json({
        message: "Plan Doesn't exists"
      })
    }

    if (method === "GET") {
        return res.status(200).json({
            data: plan,
        })
    } else if (method === "PUT") {
        const {
            title, 
            description,
            price,
            deliveryFrequency,
            productId,
            removeProduct
        }: Plan = req.body

        const productIdString = String(req.body.productId)

        if (productId) {
          if (removeProduct) {
            removeProductToPlanRelation(productIdString, planId)

            return res.status(201).json({
              message: `Product Removed from Plan ${title}`,
            })
          }

          createProductToPlanRelation(productIdString, planId)

          return res.status(201).json({
            message: `Product Added to Plan`,
          })
        }

        const plan = await prisma.plan.update({
          where: {
            id: planId
          },
          data: {
            title, 
            description,
            price,
            deliveryFrequency,
            productId
          }
        });

        return res.status(201).json({
            data: plan,
        })
    }

    return res.status(404).json({message: 'Route not found.'})
}
