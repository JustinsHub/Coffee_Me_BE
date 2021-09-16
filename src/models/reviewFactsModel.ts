import { PrismaClient } from '@prisma/client'
import { CoffeeInterface } from '../interfaces/coffeeInterface'

const { review_Facts }= new PrismaClient()

const Review: CoffeeInterface = class {// change interface
    static async getAllCoffeeReviews(){
        const coffeeReviews = await review_Facts.findMany({
            select: {
                review_facts: true
            }
        })
        return coffeeReviews
    }
}