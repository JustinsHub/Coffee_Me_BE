import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import morgan from 'morgan'
import coffeeFacts from './routes/coffeeFactsRoutes'
import {router as reviewFacts} from './routes/reviewFactsRoutes'
import { router as rejectedFacts } from './routes/rejectedFactsRoutes'
import { errorHandler } from "./expressErrors";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))


app.use('/coffee', coffeeFacts)
app.use('/review', reviewFacts)
app.use('/rejected', rejectedFacts)
//admin login

app.use(errorHandler)

export default app