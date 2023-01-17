import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getClubProviders() {
    const clubProviders = await prisma.clubProvider.findMany()

    return clubProviders
}

export async function getClubProvider(userId: string) {
    const clubProvider = await prisma.clubProvider.findUnique({
        where: {
            id: userId
        }
    })     
    return clubProvider
}