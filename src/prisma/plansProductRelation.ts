import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createProductToPlanRelation(ProductId: string, PlanId: string | undefined) {
    const product = await prisma.product.update({
      where: {
        id: ProductId
      },
      data: {
        memberOfPlans: {
          connect: [{id: PlanId}]
        }
      }
    })

    return product
}

export async function removeProductToPlanRelation(ProductId: string, PlanId: string | undefined) {
  const product = await prisma.product.update({
    where: {
      id: ProductId
    },
    data: {
      memberOfPlans: {
        disconnect: [{id: PlanId}]
      }
    }
  })

  return product
}