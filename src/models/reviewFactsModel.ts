import { PrismaClient } from '@prisma/client'
import { ErrorNotFound } from '../expressErrors'
import { ReviewFactsInterface } from '../interfaces/coffeeIMeInterface'

const { review_Facts } = new PrismaClient()

export const Review: ReviewFactsInterface = class {
    static async getAllReviews(){
        const coffeeReviews = await review_Facts.findMany({
            select: {
                id: true,
                review_facts: true
            }
        })
        return coffeeReviews
    }
    static async getSingleReview(id:number){
        const reviewID = await review_Facts.findUnique({
            where: {
                id: id
            }
        })

        if(!reviewID){
            throw new ErrorNotFound()
        }

        const singleReview = await review_Facts.findFirst({
            where: {
                id: +id
            },
            select: {
                review_facts: true,
                id: true
            }
        })
        return singleReview
    }
    
    static async createCoffeeFact(fact:string){
        //error handle, needs to be string
        const newCoffeeFact = await review_Facts.create({
            data: {
                review_facts: fact
            }
        })
        return newCoffeeFact
    }

    static async updateReviewFact(id:number, data:any){
    const reviewID = await review_Facts.findUnique({
        where: {
            id: id
        }
    })
    const reviewFact = await review_Facts.update({
        where:{
            id: id
        },
        //this is specific to the update if casting an object. Can just add req.body as data and can edit (add validator if so)
        data: {
            review_facts: data
        }
    })
    if(reviewID){
        return reviewFact 
    }
    throw new ErrorNotFound()
    //add error handling on duplicate ids?
    //id missing
    }

    static async deleteReviewedFact(id:number) {
        const reviewFactID = await review_Facts.findUnique({
            where: {
                id
            }
        })

        if(!reviewFactID){
            throw new ErrorNotFound()
        }

        const reviewedFact = await review_Facts.delete({
            where: {
                id
            }
        })
        return reviewedFact
    }
}
