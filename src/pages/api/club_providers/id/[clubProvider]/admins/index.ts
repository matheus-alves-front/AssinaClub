import type { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from 'bcrypt'

import { AdminType, Admin } from '../../../../../../@types/AdminsClubProviderTypes'
import { deleteAllClubProviderAdmins, getAdmins } from '../../../../../../prisma/adminsClubProviders'
import { checkIfClubProviderExists } from '../../../../../../prisma/clubProviders'

import { prisma } from '../../../../../../prisma/PrismaClient'
import { adminRegisterSchema } from '../../../../schemas/adminSchema'
import validateErrorsInSchema from '../../../../../../utils/validateErrosInSchema'

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

    if (validateErrorsInSchema(adminRegisterSchema, req, res) !== 'ok') return

    const emailInUse = await prisma.admin.findUnique({
      where: {
        email
      }
    })

    if (emailInUse) return res.status(409).json({
      message: 'Email already in use by another admin'
    })

    const hashedPassword = bcrypt.hashSync(password, 10)

    const admin = await prisma.admin.create({
      data: {
        name,
        birthDate,
        email,
        password: hashedPassword,
        occupation,
        clubProviderId
      }
    });

    return res.status(201).json({
      data: admin,
    })
  }
  else if (method === "DELETE") {

    if( await deleteAllClubProviderAdmins(clubProviderId)) {
      return res.json({
        message: "All admins deleted successfully"
      })
    } else {
      return res.status(500).json({
        message: "Error while deleting all admins"
      })
    }

  }

  return res.status(404).json({ message: 'Route not found.' })
}
