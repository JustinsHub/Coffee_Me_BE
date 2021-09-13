import { Request, Response, NextFunction } from "express"

export type ErrorRequestHandler = (error:any, req:Request, res: Response, next:NextFunction) => any
