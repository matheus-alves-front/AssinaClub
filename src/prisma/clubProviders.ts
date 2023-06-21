import { prisma } from './PrismaClient'
import type { NextApiResponse } from 'next'

export async function getClubProviders() {
    const clubProviders = await prisma.clubProvider.findMany()

    return clubProviders
}

export async function getClubProvider(ClubProviderId: string) {
    const clubProvider = await prisma.clubProvider.findUnique({
        where: {
            id: ClubProviderId
        }
    })     
    return clubProvider
}

export async function getClubProviderByName(clubName: string) {
    const clubProvider = await prisma.clubProvider.findUnique({
        where: {
            clubName: clubName
        }
    })     
    return clubProvider
}

export async function checkIfClubProviderExists(ClubProviderId: string) {
    const clubProvider = await getClubProvider(ClubProviderId)

    if (!clubProvider) return false

    return true
}