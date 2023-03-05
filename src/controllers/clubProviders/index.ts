import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'
import { prisma } from "../../prisma/PrismaClient"
import { getClubProvider, getClubProviders } from "../../prisma/clubProviders"
import { ClubProviderType } from "../../@types/ClubProviderTypes"
import { removeSubscriberRelationByClubProvider } from "../../prisma/signaturesRelation"
import { deleteAllClubProviderAdmins } from "../../prisma/adminsClubProviders"

type CustomRequest = NextApiRequest & {
    files: {
        location: string
    }[]
}

export async function handleGetClubProviderById(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    try {
        const clubProvider = await getClubProvider(
            req.query.clubProviderId as string
        )

        return res.status(200).json({
            data: clubProvider
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}


export async function handleGetClubProviders(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    try {
        const clubProviders = await getClubProviders()

        return res.status(200).json({
            data: clubProviders
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Something went wrong!'
        })
    }
}

export async function handlePostClubProviders(
    req: CustomRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const { password } = req.body

    // Assumes that the banner is the larger image
    const [logo, banner] = req.files.sort((a: any, b: any) => {
        if (a.size > b.size) return 1
        else return -1
    })

    const clubProvider = await prisma.clubProvider.create({
        data: {
            ...req.body,
            clubName: req.body.clubName.trim().replaceAll(" ", "-"),
            password: (password ? bcrypt.hashSync(password, 10) : password),
            creationDate: new Date(Date.now()).toISOString(),
            logo: logo.location,
            banner: banner.location,
        }
    })

    return res.status(201).json({
        data: clubProvider
    })
}

export async function handlePutClubProvidersById(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const clubProviderId = req.query.clubProviderId as string

    const { password, removeSubscriber } = req.body

    const clubProvider = await prisma.clubProvider.update({
        where: { id: clubProviderId },
        data: {
            ...req.body,
            password: (password ? bcrypt.hashSync(password, 10) : password),
        }
    })

    if (removeSubscriber) {
        removeSubscriberRelationByClubProvider(clubProviderId, removeSubscriber)

        return res.status(201).json({
            message: "Subscriber Remove Success!"
        })
    }

    return res.status(200).json({
        data: clubProvider,
        message: "Update success!"
    })
}

export async function handleDeleteClubProviderById(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const clubProviderId = req.query.clubProviderId as string

    if (!(await deleteAllClubProviderAdmins(clubProviderId))) {
        return res.status(500).json({
            message: "Error while deleting all admins"
        })
    } else {
        await prisma.clubProvider.delete({
            where: { id: clubProviderId }
        })

        return res.status(201).json({
            message: "Account Deleted"
        })
    }
}
