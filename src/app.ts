import express from "express";
import cors from 'cors'
import coffeeFacts from './routes/coffeeFactsRoutes'
import { errorHandler } from "./expressErrors";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/coffee', coffeeFacts)
//rejectedfacts on coffee?
//admin login

app.use(errorHandler)

export default app