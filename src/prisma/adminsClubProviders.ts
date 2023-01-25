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