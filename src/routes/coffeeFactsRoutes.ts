import e, { Router, Request, Response, NextFunction } from "express";
import { ErrorNotAuthorized } from "../expressErrors";
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

router.post('/api/facts/:adminId/submit', async(req: Request, res: Response, next: NextFunction) => {
    // this has to be posted by admin from review facts on approval TEST
    //make login authentication/authorization for admin

    //when the admin logs in and checks for approval, it request this api to post on coffee facts. 
    //when it posts it sends admin id back?
    try {
        const { adminId } = req.params
        const { fact } = req.body //change if needed when review facts applied
        const submitFact = await Coffee.approvedCoffeeFacts(fact, +adminId)
        return res.status(201).json(submitFact)
    } catch (error:any) {
        
        return next(error)
    }
    //create PATCH/DELETE? 
})

export default router