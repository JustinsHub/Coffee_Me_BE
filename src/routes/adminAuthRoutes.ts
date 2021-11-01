import { Router, Request, Response, NextFunction } from "express";
import { ErrorBadRequest, ErrorNotFound } from "../expressErrors";
import { Admin } from "../models/adminModel";

export const router = Router()

router.post('/admin/register', async(req:Request, res: Response, next: NextFunction) => {
    try {
        const isAdmin: boolean = true //find out how to make someone an admin? //Doesnt have to be admin to register... This is registered after by Owner/Dev
        const { username, password } = req.body
        if(!username || !password){
            throw new ErrorBadRequest("Must fill all input fields in order to register.")
        }

        const registerAdmin = await Admin.registerAdminUser(username, password, isAdmin) 
        if(!registerAdmin){
            return new ErrorNotFound
        } 
        return res.status(201).json(registerAdmin)
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
