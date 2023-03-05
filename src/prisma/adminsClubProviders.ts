import { prisma } from './PrismaClient'

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

export async function deleteAllClubProviderAdmins(clubProviderId: string) {
   try {
      await prisma.admin.deleteMany({
        where: {
          clubProviderId
        }
      })
    } catch (err) {
      console.error(err);
      return false  
    }
    return true
}