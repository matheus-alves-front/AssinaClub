import { prisma } from './PrismaClient'

export async function getPlans(ClubProviderId: string ) {
  const plans = await prisma.plan.findMany({
      where: {
          clubProviderId: ClubProviderId
      }
  })

  return plans
}

export async function getPlan( PlanId: string ) {
  const plan = await prisma.plan.findUnique({
      where: {
          id: PlanId
      }
  })

  return plan
}