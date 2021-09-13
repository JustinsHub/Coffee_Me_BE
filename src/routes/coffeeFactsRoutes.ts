import { Router, Request, Response, NextFunction } from "express";
import Coffee from "../models/coffeeFactsModel";

const router = Router()

router.get('/api/facts', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const coffeeFacts = await Coffee.getAllFacts()
        return res.json(coffeeFacts)
    } catch (error) {
        return error
    }
})

router.get('/api/facts/:id', async(req: Request, res: Response, next: NextFunction)=> {
    //check if there is no id ERRORHANDLE
    try {
        const { id } = req.params
        const singleFact = await Coffee.getSingleFact(id)
        return res.json(singleFact)
    } catch (error) {
        return error
    }
})

export default router