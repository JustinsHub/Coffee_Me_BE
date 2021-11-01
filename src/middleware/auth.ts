import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { ErrorNotAuthorized } from "../expressErrors";
import { RequestUserInterface } from "../interfaces/coffeeIMeInterface";

export const authenticateJWT = async(req:RequestUserInterface, res:Response, next:NextFunction) => {
    try {
        //remember that authorization bearer header is in client  side?  Server only accesses it through req.headers
        const authHeader:any = req.headers['authorization']
        const getBearerToken = authHeader.split(' ') 
        const token = getBearerToken[1] //["Bearer", "token"] // Bearer can be any string
        const payload = await jwt.verify(token, SECRET_KEY)
        req.token = payload 
        console.log(authHeader)
        console.log('Valid Token')
        return next()
    } catch (error) {
        console.log('No token boys')
        return next()
    }
}

export const protectedRoute = async(req:RequestUserInterface, res:Response, next:NextFunction) => {
    if(!req.token){
        return next(new ErrorNotAuthorized())
    }
    return next()
}

//req.headers.authorization has anything and split(' ')[0] has no "Bearer" on first word that's split