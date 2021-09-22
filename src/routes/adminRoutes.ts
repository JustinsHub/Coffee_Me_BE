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
