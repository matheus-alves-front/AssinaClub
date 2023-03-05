import { NextApiRequest, NextApiResponse } from "next"
import { deleteAllClubProviderAdmins, getAdmin, getAdmins } from "../../prisma/adminsClubProviders"
import bcrypt from "bcrypt"
import { prisma } from "../../prisma/PrismaClient"
import { Admin } from "../../@types/AdminsClubProviderTypes"

type CustomRequest = NextApiRequest & {
    file: {
        location: string
    }
    locals?: {
        admin: Admin
    }
}

export async function handleGetAdmin(
    req: CustomRequest,
    res: NextApiResponse
) {
    if (req.locals) {
        return res.status(200).json({
            data: req.locals.admin
        })
    }
    return res.status(200).json({
        message: "Admin not found!"
    })
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
    const { password } = req.body

    const { file: image } = req

    try {
        const admin = await prisma.admin.create({
            data: {
                ...req.body,
                password: bcrypt.hashSync(password, 10),
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

export async function handlePutAdmin(
    req: CustomRequest,
    res: NextApiResponse
) {
    const { password } = req.body

    const admin = await prisma.admin.update({
        where: {
            id: req.query.clubProviderAdmin as string
        },
        data: {
            ...req.body,
            password: (password ? bcrypt.hashSync(password, 10) : password),
        }
    })

    return res.status(200).json({
        data: admin,
    })
}

export async function handleDeleteAdmin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await prisma.admin.delete({
        where: { id: req.query.clubProviderAdmin as string }
    })

    return res.status(201).json({
        message: "Account Deleted"
    })
}

export async function handleDeleteAdmins(
    req: NextApiRequest,
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