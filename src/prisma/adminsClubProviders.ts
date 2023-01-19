import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAdmins(ClubProviderId: string ) {
  const admins = await prisma.admin.findMany({
      where: {
          clubProviderId: ClubProviderId
      }
  })

  return admins
}

export async function getAdmin( AdminId: string ) {
  const admin = await prisma.admin.findUnique({
      where: {
          id: AdminId
      }
  })

  return admin
}

export async function ClubProviderExists(clubProviderId: string) {
  const clubProviderExists = await prisma.clubProvider.findUnique({
    where: {
      id: clubProviderId
    }
  })

  return clubProviderExists 
}