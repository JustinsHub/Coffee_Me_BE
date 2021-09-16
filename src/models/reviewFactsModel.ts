import { PrismaClient } from '@prisma/client'
import { ErrorNotFound } from '../expressErrors'
import { ReviewFactsInterface } from '../interfaces/coffeeIMeInterface'

const { review_Facts }= new PrismaClient()

const Review: ReviewFactsInterface = class {// change interface
    static async getAllReviews(){
        const coffeeReviews = await review_Facts.findMany({
            select: {
                review_facts: true
            }
        })
        return coffeeReviews
    }
    static async getSingleReview(id:string){
        const reviewID = await review_Facts.findUnique({
            where: {
                id: +id
            }
        })
        const singleReview = await review_Facts.findFirst({
            where: {
                id: +id
            },
            select: {
                review_facts: true
            }
        })
        if(reviewID){
            return singleReview
        }
        throw new ErrorNotFound()
    }
    static async createCoffeeFact(fact:string){
        const newCoffeeFact = await review_Facts.create({
            data: {
                review_facts: fact
            }
        })
        return newCoffeeFact
    }
    //update and delete.
}