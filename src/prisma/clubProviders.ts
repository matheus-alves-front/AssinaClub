import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { ClubProviderType } from '../@types/ClubProviderTypes'

const prisma = new PrismaClient()

export async function getClubProviders() {
    const clubProviders = await prisma.clubProvider.findMany()

    return clubProviders
}

export async function getClubProvider(UserId: string) {
    const clubProvider = await prisma.clubProvider.findUnique({
        where: {
            id: UserId
        }
    })     
    return clubProvider
}

export async function checkIfClubProviderExists(ClubProviderId: string) {
    const clubProvider = await getClubProvider(ClubProviderId)

    if (!clubProvider) return false

    return true
}