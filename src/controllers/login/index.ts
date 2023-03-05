import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/PrismaClient";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Subscriber } from "../../@types/SubscriberTypes";
import { ClubProvider } from "../../@types/ClubProviderTypes";
import { Admin } from "../../@types/AdminsClubProviderTypes";

export default async function handleLogin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        email,
        password,
        typeOfUser
    } = req.body

    let user, clubProviderId

    switch (typeOfUser) {
        case 'subscriber':
            try {
                const subscriber = await prisma.subscriber.findUnique({
                    where: {
                        email: email
                    }
                })
                user = subscriber as Subscriber

            } catch (error) {
                console.error(error)
                return res.status(500).json({
                    message: "An error occurred trying to login",
                })
            }
            break;

        case 'clubProvider':
            try {
                const clubProvider = await prisma.clubProvider.findUnique({
                    where: {
                        email: email
                    }
                })
                user = clubProvider as ClubProvider

            } catch (error) {
                console.error(error)
                return res.status(500).json({
                    message: "An error occurred trying to login",
                })
            }
            break;

        case 'admin':
            try {
                const admin = await prisma.admin.findUnique({
                    where: {
                        email: email
                    }
                })
                user = admin as Admin
                clubProviderId = user.clubProviderId

            } catch (error) {
                console.error(error)
                return res.status(500).json({
                    message: "An error occurred trying to login",
                })
            }
            break;

        default:
            break;
    }

    if (!user) {
        return res.status(404).json({ message: "No account found" })
    }

    const passwordMatched = bcrypt.compareSync(password, user.password)

    if (!passwordMatched) {
        return res.status(404).json({ message: "No account found" })
    }

    const tokenMessage = (
        typeOfUser === 'subscriber' ? { subscriberId: user.id } : (
            typeOfUser === 'clubProvider' ? { clubProviderId: user.id } :
                { adminId: user.id, clubProviderId }
        )
    )

    const token = jwt.sign(
        tokenMessage,
        process.env.SECRET ?? "",
        { expiresIn: 60 * 60 * 12 } // 12 hours
    )

    return res.json({
        data: {
            token
        }
    })
}