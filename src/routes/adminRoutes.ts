import { Router, Request, Response, NextFunction } from "express";
import { Admin } from "../models/adminModel";

export const router = Router()

router.get('/admin/all', async(req: Request, res:Response, next: NextFunction) =>{
    try {
        const allAdminUsers = await Admin.getAllAdminUsers()
        return res.json(allAdminUsers)
    } catch (error) {
        return next(error)
    }
})

router.get('/admin/:username', async(req:Request, res:Response, next: NextFunction) => {
    try {
        const { username } = req.params
        const getSingleAdmin = await Admin.getSingleAdminUser(username)
        return res.json(getSingleAdmin)
    } catch (error) {
        return next(error)
    }
})

router.post('/admin/register', async(req:Request, res: Response, next: NextFunction) => {
    try {
        const isAdmin: boolean = true //find out how to make someone an admin?
        const { username, password} = req.body
        const registerAdmin = await Admin.registerAdminUser(username, password, isAdmin)
        if(isAdmin){
            return res.status(201).json(registerAdmin)
        }
    } catch (error) {
        return next(error)
    }
})