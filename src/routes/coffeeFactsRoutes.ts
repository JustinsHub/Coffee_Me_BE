import e, { Router, Request, Response, NextFunction } from "express";
import { ErrorNotAuthorized, ErrorNotFound } from "../expressErrors";
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
    //make reviews facts api
    //make rejected
    //make login authentication/authorization for admin


    //when the admin logs in and checks for approval, it request this api to post on coffee facts. 
    //when it posts it sends admin id back?
    try {
        const { adminId } = req.params
        const { fact } = req.body //change if needed when review facts applied
        const submitFact = await Coffee.createCoffeeFacts(fact, +adminId)
        return res.status(201).json(submitFact)
    } catch (error:any) {
        if(error.code === "P2003"){ //Foreign Key constraint Prisma error
            return next(new ErrorNotAuthorized())
        }
    }
})

export default router