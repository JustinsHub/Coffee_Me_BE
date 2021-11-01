import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import coffeeFacts from './routes/coffeeFactsRoutes'
import { router as reviewFacts } from './routes/reviewFactsRoutes'
import { router as rejectedFacts } from './routes/rejectedFactsRoutes'
import { router as adminUser } from './routes/adminRoutes'
import { router as adminAuth } from './routes/adminAuthRoutes'
import { errorHandler } from "./expressErrors";
import { authenticateJWT } from "./middleware/auth";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))
app.use(authenticateJWT)

app.use('/', reviewFacts)
app.use('/', rejectedFacts)
app.use('/', adminUser)
app.use('/', adminAuth)
app.use('/coffee', coffeeFacts)

app.use(errorHandler)

export default app