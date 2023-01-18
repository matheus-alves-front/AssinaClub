import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createSubscriberRelation(SubscriberId: string, ClubProviderId: string | undefined) {
    const subscribers = await prisma.subscriber.update({
      where: {
        id: SubscriberId
      },
      data: {
        signatures: {
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
      signatures: {
        disconnect: [{id: ClubProviderId}]
      }
    }
  })

  return subscribers
}

export async function removeSubscriberRelationByClubProvider(SubscriberId: string, ClubProviderId: string | undefined) {
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