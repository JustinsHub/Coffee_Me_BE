import { Router, Request, Response, NextFunction } from "express";
import { Review } from "../models/reviewFactsModel";

export const router = Router()

//put type for res,req,next and just import in future.
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
        const singleReview = await Review.getSingleReview(+id)
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

router.patch('/api/reviews/:id/update', async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { id } = req.params
        const { facts } = req.body //specific to what we are editing. (add schema for validation)
        const updateReviewedFact = await Review.updateReviewFact(+id, facts)
        return res.status(201).json(updateReviewedFact)
    } catch (error) {
        return next(error)
    }
})