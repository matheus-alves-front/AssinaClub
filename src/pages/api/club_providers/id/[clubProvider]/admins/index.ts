import type { NextApiRequest, NextApiResponse } from 'next'

import { AdminType, Admin } from '../../../../../../@types/AdminsClubProviderTypes'
import { getAdmins } from '../../../../../../prisma/adminsClubProviders'
import { checkIfClubProviderExists } from '../../../../../../prisma/clubProviders'

import { prisma } from '../../../../../../prisma/PrismaClient'

export default async function handleAdminsOfClubProviders(
  req: NextApiRequest,
  res: NextApiResponse<AdminType>
) {
  const { method } = req
  const clubProviderId = String(req.query.clubProvider)

  await prisma.$connect()

  if (!await checkIfClubProviderExists(clubProviderId)) {
    return res.status(404).json({
      message: "Provider not found!"
    })
  }

  if (method === "GET") {
    const admins = await getAdmins(clubProviderId)

    return res.status(200).json({
      data: admins.reverse(),
    })
  } else if (method === "POST") {
    const {
      name,
      birthDate,
      email,
      password,
      occupation,
    }: Admin = req.body

    const admin = await prisma.admin.create({
      data: {
        name,
        birthDate,
        email,
        password,
        occupation,
        clubProviderId
      }
    });

    return res.status(201).json({
      data: admin,
    })
  }

  return res.status(404).json({ message: 'Route not found.' })
}
