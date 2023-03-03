import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'
import { prisma } from "../../prisma/PrismaClient"
import { getClubProviders } from "../../prisma/clubProviders"
import { ClubProvider, ClubProviderType } from "../../@types/ClubProviderTypes"

type CustomRequest = NextApiRequest & {
    files: {
        location: string
    }[]
}

export async function handleGetClubProviders(req: NextApiRequest, res: NextApiResponse<ClubProviderType>) {
    const clubProviders = await getClubProviders()

    return res.status(200).json({
        data: clubProviders
    })
}

export async function handlePostClubProviders(req: CustomRequest, res: NextApiResponse<ClubProviderType>) {
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
        data: clubProvider,
    })

}
