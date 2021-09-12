import { Router, Request, Response, NextFunction } from "express";
import Coffee from "../models/coffeeFactsModel";

const router = Router()

router.get('/api/facts', async(req: Request, res: Response, next: NextFunction) => {
    const coffeeFacts = await Coffee.getAllFacts()
    return res.json(coffeeFacts)
})

router.get('/api/facts/:id', async(req: Request, res: Response, next: NextFunction)=> {
    const { id } = req.params
    // plug this in coffee method
})

export default router