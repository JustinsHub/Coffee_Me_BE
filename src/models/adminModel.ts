import { PrismaClient } from ".prisma/client";
import bcrypt from 'bcrypt'
import { ErrorNotFound } from "../expressErrors";
import dotenv from 'dotenv'
dotenv.config()

const { admin } = new PrismaClient()

export const Admin = class {
    static async getAllAdminUsers(){
        const allAdminUsers = await admin.findMany({
            select: {
                id: true,
                username: true,
                admin_only: true,
                created_on: true
            }
        })
        return allAdminUsers
    }
    
    static async getSingleAdminUser(username:string){
        const singleAdminUser = await admin.findUnique({
            where: {
                username
            },
            select: {
                id: true,
                username: true,
                created_on: true
            }
        })
        if(singleAdminUser){
            return singleAdminUser
        }
        throw new ErrorNotFound()
    }

    static async registerAdminUser(username:string, password:string, isAdmin: boolean){
        const bcryptWorkFactor = process.env.BCRYPT_WORK_FACTOR as string | number
        const hashedPassword = await bcrypt.hash(password, +bcryptWorkFactor)
        const registerNewAdmin = await admin.create({
            data: {
                username,
                password: hashedPassword,
                admin_only: isAdmin
            }
        })
        return registerNewAdmin 
        //error handling
    }
}
