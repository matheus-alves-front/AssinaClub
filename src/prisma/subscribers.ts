import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getSubscribers() {
    const subscribers = await prisma.subscriber.findMany()

    return subscribers
}

export async function getSubscriber(userId: string) {
    const subscriber = await prisma.subscriber.findUnique({
        where: {
            id: userId
        }
    })     
    return subscriber
}