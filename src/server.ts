import app from './app'
import dotenv from "dotenv"
dotenv.config() 

app.listen(process.env.PORT, ():void => {
    console.log(`Listening to ${process.env.PORT}`)
})

