import { Admin } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { deleteAllClubProviderAdmins, getAdmins } from "../../prisma/adminsClubProviders"
import bcrypt from "bcrypt"
import { prisma } from "../../prisma/PrismaClient"

type CustomRequest = NextApiRequest & {
    file: {
        location: string
    }
}

export async function handleGetAdmins(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const clubProviderId = req.query.clubProvider as string

    try {
        const admins = await getAdmins(clubProviderId)

        return res.status(200).json({
            data: admins.reverse()
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handlePostAdmins(
    req: CustomRequest,
    res: NextApiResponse
) {
    const {
        name,
        birthDate,
        email,
        password,
        occupation,
    }: Admin = req.body

    const { file: image } = req

    try {
        const admin = await prisma.admin.create({
            data: {
                name,
                birthDate,
                email,
                password: bcrypt.hashSync(password, 10),
                occupation,
                clubProviderId: req.query.clubProvider as string,
                userImage: image.location
            }
        });

        return res.status(201).json({   
            data: admin
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handleDeleteAdmins(
    req: CustomRequest,
    res: NextApiResponse
) {
    const clubProviderId = req.query.clubProvider as string

    try {
        if (await deleteAllClubProviderAdmins(clubProviderId)) {
            return res.json({
                message: "All admins deleted successfully"
            })
        } else {
            return res.status(500).json({
                message: "Error while deleting all admins"
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}