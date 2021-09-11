import { Router } from "express";
const router = Router()

router.get('/coffee-facts', (req, res, next) => {
    return res.json('Our coffee facts')
})

export default router