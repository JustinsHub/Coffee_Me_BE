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

app.use(errorHandler)

export default app