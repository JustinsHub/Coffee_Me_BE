import { Router, Request, Response, NextFunction } from "express";
import { Admin } from "../models/adminModel";

export const router = Router()

router.post('/admin/register', async(req:Request, res: Response, next: NextFunction) => {
    try {
        const isAdmin: boolean = true //find out how to make someone an admin?
        const { username, password} = req.body
        const registerAdmin = await Admin.registerAdminUser(username, password, isAdmin) // add jwt?
        if(isAdmin){
            return res.status(201).json(registerAdmin)
        }
    } catch (error) {
        return next(error)
    }
})

router.post('/admin/login', async(req:Request, res: Response, next:NextFunction)=> {
    try {
        const {username, password} = req.body
        const adminLogin = await Admin.loginAdminUser(username, password) //add jwt?
        return res.status(201).json(adminLogin)
    } catch (error) {
        return next(error)
    }
})
