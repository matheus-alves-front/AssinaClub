import { prisma } from './PrismaClient'
import type { NextApiResponse } from 'next'

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

export async function validateClubProviderConflict(clubName: string, email: string, res: NextApiResponse) {
    
    try {
        if(clubName) {
            const clubNameInUse = await prisma.clubProvider.findUnique({
                where: {
                    clubName: clubName
                }
            })
        
            if (clubNameInUse) return res.status(409).json({
                message: "ClubName already in use"
            })
        }

        if(email) {
            const clubEmailInUse = await prisma.clubProvider.findUnique({
                where: {
                    email: email
                }
            })
        
            if (clubEmailInUse) return res.status(409).json({
                message: "Email already in use"
            })    
        }
    
    } catch (error) {
        console.log(error)
    }

    return 'ok'
}