// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PlansType, Plan } from '../../../../../../@types/PlansTypes'
import { checkIfClubProviderExists } from '../../../../../../prisma/clubProviders'
import { getPlan } from '../../../../../../prisma/plans'
import { createProductToPlanRelation, removeProductToPlanRelation } from '../../../../../../prisma/plansProductRelation'
import { getProducts } from '../../../../../../prisma/products'

const prisma = new PrismaClient()

export default async function handlePlansOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<PlansType>
) {
  const { method } = req
  const clubProviderId = String(req.query.clubProvider)
  const planId = String(req.query.planId)

  await prisma.$connect()

  if (!await checkIfClubProviderExists(clubProviderId)) return res.status(404).json({
    message: "Provider not found!"
  })

  const plan = await getPlan(planId)
  
  if (!plan) {
    return res.status(404).json({
      message: "Plan not found!"
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
      const products = await getProducts(clubProviderId)
      const planName = products.filter(product => product.id === productIdString)[0].name

      if (removeProduct) {
        removeProductToPlanRelation(productIdString, planId)

        return res.status(201).json({
          message: `Product Removed from Plan ${planName}`,
        })
      }

      createProductToPlanRelation(productIdString, planId)

      return res.status(201).json({
        message: `Product Added to Plan ${planName}`,
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
  } else if (method === "DELETE") {
    await prisma.plan.delete({
      where: { id: planId }
    })

    return res.status(201).json({
      message: "Plan Deleted",
    })
  }

  return res.status(404).json({ message: 'Route not found.' })
}
