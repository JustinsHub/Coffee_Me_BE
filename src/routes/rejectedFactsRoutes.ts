import { Router, Request, Response, NextFunction } from "express";
import { RejectedFact } from "../models/rejectedFactsModel";

export const router = Router()

router.get('/api/rejected/all', async(req: Request, res: Response, next:NextFunction)=>{
    try {
        const allRejectedFacts = await RejectedFact.getAllRejectedFacts()
        return res.json(allRejectedFacts)
    } catch (error) {
        return next(error)
    }
})

router.get('/api/rejected/:id', async(req:Request, res:Response, next:NextFunction)=> {
    try {
        const { id } = req.params
        const singleRejectedFact = await RejectedFact.getSingleRejectedFact(id)
        return res.json(singleRejectedFact)
    } catch (error) {
        return next(error)
    }
})

router.post('/api/rejected/:adminId/fact', async(req:Request, res:Response, next:NextFunction)=> {
    try {
        const { adminId } = req.params 
        const { fact } = req.body
        const rejectedFact = await RejectedFact.rejectedCoffeeFact(fact, +adminId)
        return res.status(201).json(rejectedFact)
    } catch (error) {
        return next(error)
    }
})