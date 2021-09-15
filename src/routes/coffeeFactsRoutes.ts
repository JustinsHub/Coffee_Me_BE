import { Router, Request, Response, NextFunction } from "express";
import { ErrorNotFound } from "../expressErrors";
import Coffee from "../models/coffeeFactsModel";

const router = Router()

router.get('/api/facts', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const coffeeFacts = await Coffee.getAllFacts()
        return res.json(coffeeFacts)
    } catch (error) {
        return next(error)
    }
})

router.get('/api/facts/:id', async(req: Request, res: Response, next: NextFunction)=> {
    try {
        const { id } = req.params
        const singleFact = await Coffee.getSingleFact(id)
        return res.json(singleFact)
    } catch (error) {
        return next(error) 
    }
})

router.post('/api/facts/submit/:adminId', async(req: Request, res: Response, next: NextFunction) => {
    // this has to be posted by admin from review facts on approval TEST
    try {
        const { adminId } = req.params
        const { fact } = req.body
        const submitFact = Coffee.createCoffeeFacts(fact, +adminId)
        return res.status(201).json(submitFact)
    } catch (error) {
        return next(error)
    }
})

export default router