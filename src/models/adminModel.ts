import { PrismaClient } from ".prisma/client";
import bcrypt from 'bcrypt'
import { ErrorBadRequest, ErrorNotAuthorized, ErrorNotFound } from "../expressErrors";
import { BCRYPT_WORK_FACTOR, SECRET_KEY } from '../config'
import jwt from "jsonwebtoken";

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
        const adminUsername = await admin.findUnique({
            where: {
                username
            }
        })
        //Finding duplicate usernames
        if(adminUsername){
            throw new ErrorBadRequest("Username already taken.")
        }

        const bcryptWorkFactor = BCRYPT_WORK_FACTOR as string | number
        const hashedPassword = await bcrypt.hash(password, +bcryptWorkFactor)
        const registerNewAdmin = await admin.create({
            data: {
                username,
                password: hashedPassword,
                admin_only: isAdmin
            }
        })
        if(registerNewAdmin){
            const token = jwt.sign({id: registerNewAdmin.id}, SECRET_KEY)
            return {accessToken: token}
        }
        return registerNewAdmin 
    }
    static async loginAdminUser(username:string, password:string){
        const loginAdmin = await admin.findUnique({
            where: {
                username
            },
            select: {
                id: true
            }
        })

        const adminPassword = await admin.findUnique({
            where:{
                username,
            },
            select: {
                password: true
            }
        })
        const adminBcrypt = await bcrypt.compare(password, adminPassword?.password as string) 
        if(adminBcrypt){
            const token = jwt.sign({id: loginAdmin?.id}, SECRET_KEY)
           return {accessToken: token}
        }
        throw new ErrorNotAuthorized('Invalid Credentials')
    }

    //no patch?
    //delete
}
