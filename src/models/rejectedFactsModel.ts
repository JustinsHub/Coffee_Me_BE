import { PrismaClient } from ".prisma/client";
import { ErrorNotAuthorized, ErrorNotFound } from "../expressErrors";
import { RejectedFactsInterface } from "../interfaces/coffeeIMeInterface";

const { rejected_Facts } = new PrismaClient()

export const RejectedFact: RejectedFactsInterface = class {
    static async getAllRejectedFacts(){
        const allRejectedFacts = await rejected_Facts.findMany({
            select: {
                id: true,
                rejected_facts: true
            }
        })
        return allRejectedFacts
    }
    static async getSingleRejectedFact(id:string){
        const rejectedFactID = await rejected_Facts.findUnique({
            where:{
                id: +id
            }
        })

        const singleRejectedFact = await rejected_Facts.findFirst({
            where: {
                id: +id
            },
            select: {
                id: true,
                rejected_facts: true
            }
        })
        if(rejectedFactID){
            return singleRejectedFact
        }
        throw new ErrorNotFound()
    }
    static async rejectedCoffeeFact(fact:string, adminId:number){
        const adminUser = await rejected_Facts.findUnique({
            where: {
                id: adminId
            }
        })

        const rejectedFact = await rejected_Facts.create({
            data: {
                rejected_facts: fact,
                admin_id: adminId
            }
        })
        if(adminUser){
            return rejectedFact
        }
        throw new ErrorNotAuthorized()
    }
}