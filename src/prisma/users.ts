import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUsers() {
    const users = await prisma.user.findMany()

    return users
}

export async function getUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    }) 
    
    return user
}