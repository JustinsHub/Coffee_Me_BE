import express from "express"
import dotenv from "dotenv"
dotenv.config() 

const app = express()

app.listen(process.env.PORT, ():void => {
    console.log(`Listening to ${process.env.PORT}`)
})

