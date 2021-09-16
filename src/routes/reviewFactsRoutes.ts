import { Router, Request, Response, NextFunction } from "express";
import { Review } from "../models/reviewFactsModel";

export const router = Router()

router.get('/api/reviews/all', async(req: Request, res:Response, next:NextFunction) => {
    try {
        const readyForReviews = await Review.getAllReviews()
        return res.json(readyForReviews)
    } catch (error) {
        return next(error)
    }  
})

router.get('/api/reviews/:id', async(req: Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const singleReview = await Review.getSingleReview(id)
        return res.json(singleReview)
    } catch (error) {
        return next(error)
    }
})

router.post('/api/reviews/post', async(req:Request, res:Response, next:NextFunction)=> {
    try {
        const { fact } = req.body
        const newFactPost = await Review.createCoffeeFact(fact)
        return res.status(201).json(newFactPost)
    } catch (error) {
        return next(error)
    }
})