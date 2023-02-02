import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import { AdminType, Admin } from '../../../../../../@types/AdminsClubProviderTypes'
import { getAdmin } from '../../../../../../prisma/adminsClubProviders'
import { checkIfClubProviderExists } from '../../../../../../prisma/clubProviders'

import { prisma } from '../../../../../../prisma/PrismaClient'

export default async function handleAdminOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<AdminType>
) {
  const { method } = req
  const clubProviderId = String(req.query.clubProvider)
  const clubProviderAdmin = String(req.query.clubProviderAdmin)

  await prisma.$connect()

  if (!await checkIfClubProviderExists(clubProviderId)) {
    return res.status(404).json({
      message: "Provider not found!"
    })
  }

  const foundAdmin = await getAdmin(clubProviderAdmin)

  if (!foundAdmin) {
    return res.status(404).json({
      message: "Admin not found!"
    })
  }

  if (method === "GET") {
    const admin = await getAdmin(clubProviderAdmin)

    return res.status(200).json({
      data: admin,
    })

  } else if (method === "PUT") {
    const {
      name,
      birthDate,
      email,
      password,
      occupation,
    }: Admin = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const admin = await prisma.admin.update({
      where: {
        id: clubProviderAdmin
      },
      data: {
        name,
        birthDate,
        email,
        password: hashedPassword,
        occupation
      }
    })

    return res.status(201).json({
      data: admin,
    })

  } else if (method === "DELETE") {    
    await prisma.admin.delete({
      where: { id: clubProviderAdmin }
    })

    return res.status(201).json({
      message: "Account Deleted",
    })
  }

  return res.status(404).json({ message: 'Route not found.' })
}
