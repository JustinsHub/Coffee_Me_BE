import express from "express";
import cors from 'cors'
import coffeeFacts from './routes/coffeeFactsRoutes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/', coffeeFacts)

export default app