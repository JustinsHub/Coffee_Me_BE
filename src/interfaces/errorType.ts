import { Request, Response, NextFunction } from "express"
import { ExpressError } from "../expressErrors"

export type ErrorRequestHandler = (error:ExpressError, req:Request, res: Response, next:NextFunction) => any
