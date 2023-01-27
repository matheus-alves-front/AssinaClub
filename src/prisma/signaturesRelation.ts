import { prisma } from './PrismaClient'

export async function createSubscriberRelation(SubscriberId: string, ClubProviderId: string | undefined) {
    const subscribers = await prisma.subscriber.update({
      where: {
        id: SubscriberId
      },
      data: {
        signaturesClubs: {
          connect: [{id: ClubProviderId}]
        }
      }
    })

    return subscribers
}

export async function removeSubscriberRelation(SubscriberId: string, ClubProviderId: string | undefined) {
  const subscribers = await prisma.subscriber.update({
    where: {
      id: SubscriberId
    },
    data: {
      signaturesClubs: {
        disconnect: [{id: ClubProviderId}]
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