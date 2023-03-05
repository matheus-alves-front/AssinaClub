import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'
import { prisma } from "../../prisma/PrismaClient"
import { getClubProvider, getClubProviders } from "../../prisma/clubProviders"
import { ClubProvider, ClubProviderType } from "../../@types/ClubProviderTypes"
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
    const clubProviderId = req.query.clubProviderId as string

    const clubProvider = await getClubProvider(clubProviderId)

    return res.status(200).json({
        data: clubProvider
    })
}


export async function handleGetClubProviders(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const clubProviders = await getClubProviders()

    return res.status(200).json({
        data: clubProviders
    })
}

export async function handlePostClubProviders(
    req: CustomRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const {
        clubName,
        hostName,
        cpf,
        cnpj,
        email,
        password,
        description
    }: ClubProvider = req.body

    let { files } = req

    files = files.sort((a: any, b: any) => {
        if (a.size > b.size) return 1
        else return -1
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const clubNameCleaned = clubName.trim().replaceAll(" ", "-")

    const clubProviderCreation = {
        data: {
            clubName: clubNameCleaned,
            hostName,
            cpf,
            cnpj,
            password: hashedPassword,
            email,
            description,
            creationDate: new Date(Date.now()).toISOString(),
            logo: files[0].location,
            banner: files[1].location,
        }
    }
    const clubProvider = await prisma.clubProvider.create(clubProviderCreation)

    return res.status(201).json({
        data: clubProvider
    })

}

export async function handlePutClubProvidersById(
    req: NextApiRequest,
    res: NextApiResponse<ClubProviderType>
) {
    const clubProviderId = req.query.clubProviderId as string

    const {
        clubName,
        hostName,
        cpf,
        cnpj,
        email,
        password,
        description,
        removeSubscriber
    }: ClubProvider = req.body

    let hashedPassword

    if (password) hashedPassword = bcrypt.hashSync(password, 10)

    const clubProvider = await prisma.clubProvider.update({
        where: { id: clubProviderId },
        data: {
            clubName,
            hostName,
            cpf,
            cnpj,
            email,
            password: hashedPassword,
            description
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
