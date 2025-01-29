import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService {
    static async register(user: User) {
        const findUser = await prisma.user.findUnique({ where: { email: user.email } })
        if (findUser) throw new HttpException(409, `User ${user.email} alredy exists`)

        const passwordEcrypted = await bcrypt.hash(user.password, 10)

        return await prisma.user.create({
            data: {
                ...user,
                password: passwordEcrypted,
                role: null
            },
            omit: {
                password: true
            }
        })

    }

    static async login(email: string, password: string) {

        // ver si el usuario existe
        const query = `SELECT id, email, role, password  FROM users WHERE email='${email}' AND password='${password}'`
        const findUsers = await prisma.$executeRawUnsafe(query)as unknown as User[]
        const findUser = findUsers[0]
        // const findUser = await prisma.user.findUnique({ where: { email } })
         if (!findUser) throw new HttpException(401, 'Invalid user or password')
 
        // ver si el password coincide
         const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
         if (!isPasswordCorrect) throw new HttpException(401, 'Invalid user or password')

        // generar el token de autenticación
        const token = jwt.sign(
            { colorFavorito: 'azul', id: findUser.id, email: findUser.email, role: findUser.role },
            TOKEN_PASSWORD,
            { expiresIn: "1h" })

        // devolver el token
        return token
    }

    static async getUserByEmail(email: string) {
        const findUser = await prisma.user.findUnique({ where: { email } })
        if (!findUser) throw new Error('User not found')
        return findUser
    }

    static async getUserById(id: number) {
        const findUser = await prisma.user.findUnique({ where: { id } })
        if (!findUser) throw new Error('User not found')
        return findUser
    }

    static async getAll (){
        const users = await prisma.user.findMany({
            omit: {password:true}
        })
        return users

    }

}