import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { ValidationErrorItem } from '@hapi/joi';

import { LoginRequest, LoginType } from '../../../@types/LoginType';

import { prisma } from '../../../prisma/PrismaClient';
import { loginAttemptSchema } from '../schemas/loginSchema';
import validateErrorsInSchema from '../../../middleware/validateErrosInSchema';

export default async function handleLogin(
    req: NextApiRequest,
    res: NextApiResponse<LoginType>
) {
    const { method } = req

    if (method === "POST") {

        const {
            email,
            password,
            typeOfUser
        }: LoginRequest = req.body

        if (validateErrorsInSchema(loginAttemptSchema, req, res) !== 'ok') return

        else {
            return login(typeOfUser, res, email, password)
        }
    }
}

async function login(
    typeOfUser: string,
    res: NextApiResponse<LoginType>,
    email: string,
    password: string
) {

    try {
        if (typeOfUser === "subscriber") {

            const subscriber = await prisma.subscriber.findUnique({
                where: {
                    email: email
                }
            })

            if (!subscriber) return res.status(404).json({ message: "No account found" })

            const hashedPassword = bcrypt.compareSync(password, subscriber.password)

            if (!hashedPassword) return res.status(404).json({ message: "No subscriber found" })

            const token = jwt.sign(
                { subscriberId: subscriber.id },
                process.env.SECRET ?? "",
                { expiresIn: 60 * 60 * 12 } // 12 hours
            )

            return res.json({ data: { token } })

        } else if (typeOfUser === "clubProvider") {

            const clubProvider = await prisma.clubProvider.findUnique({
                where: {
                    email: email
                }
            })

            if (!clubProvider) return res.status(404).json({ message: "No account found" })

            const hashedPassword = bcrypt.compareSync(password, clubProvider.password)

            if (!hashedPassword) return res.status(404).json({
                message: "No user found with this data."
            })

            const token = jwt.sign(
                { clubProviderId: clubProvider.id },
                process.env.SECRET ?? "",
                { expiresIn: 60 * 60 * 12 } // 12 hours
            )

            return res.status(200).json({ data: { token } })
        } else if (typeOfUser === "admin") {

            const admin = await prisma.admin.findUnique({
                where: {
                    email: email
                }
            })

            if (!admin) return res.status(404).json({ message: "No account found" })         

            const hashedPassword = bcrypt.compareSync(password, admin.password)

            if (!hashedPassword) return res.status(404).json({
                message: "No user found with this data."
            })

            const token = jwt.sign(
                { adminId: admin.id, clubProviderId: admin.clubProviderId },
                process.env.SECRET ?? "",
                { expiresIn: 60 * 60 * 12 } // 12 hours
            )

            return res.status(200).json({ data: { token } })
        }

        return res.status(400).json({
            message: "Invalid type of user"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "An error occurred trying to login",
        })
    }
}
