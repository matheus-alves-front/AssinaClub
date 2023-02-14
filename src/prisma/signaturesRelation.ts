import { prisma } from './PrismaClient'

export async function createSubscriberRelation(SubscriberId: string, ClubProviderId: string | undefined, PlanId: string) {
    const subscribers = await prisma.subscriber.update({
      where: {
        id: SubscriberId
      },
      data: {
        signaturesClubs: {
          connect: [{id: ClubProviderId}]
        },
        signaturePlans: {
          connect: [{id: PlanId}]
        }
      }
    })

    return subscribers
}


export async function removeSubscriberRelation(SubscriberId: string, ClubProviderId: string | undefined, PlanId: string) {
  const subscribers = await prisma.subscriber.update({
    where: {
      id: SubscriberId
    },
    data: {
      signaturesClubs: {
        disconnect: [{id: ClubProviderId}]
      },
      signaturePlans: {
        disconnect: [{id: PlanId}]
      }
    }
  })

  return subscribers
}

export async function removeSubscriberRelationByClubProvider(ClubProviderId: string, SubscriberId: string | undefined) {
  const subscribers = await prisma.clubProvider.update({
    where: {
      id: ClubProviderId
    },
    data: {
      subscribers: {
        disconnect: [{id: SubscriberId}]
      }
    }
  })

  return subscribers
}

// export async function getPlansAssignature