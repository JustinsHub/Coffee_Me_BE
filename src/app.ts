import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import morgan from 'morgan'
import coffeeFacts from './routes/coffeeFactsRoutes'
import { errorHandler, ExpressError } from "./expressErrors";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))


app.use('/coffee', coffeeFacts)
//rejectedfacts on coffee?
//admin login

app.use((error:ExpressError, req:Request, res:Response, next:NextFunction) => {
    let status:number = error.status || 500
    let message:string = error.message
    return res.status(status).json({
        error: {
            message, 
            status
        }
    })
});

export default app