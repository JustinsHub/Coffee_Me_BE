import { PrismaClient } from ".prisma/client"
import { CoffeeMeInterface } from "../interfaces/coffeeIMeInterface"
import { ErrorNotAuthorized, ErrorNotFound } from "../expressErrors"

const { coffee_Facts } = new PrismaClient()

const Coffee: CoffeeMeInterface = class {

    static async getAllFacts() {
        const allCoffeeFacts = await coffee_Facts.findMany({
            select: {
                coffee_facts: true
            }
        })
        return allCoffeeFacts
    }

    static async getSingleFact(id:string) {
        const singleFact = await coffee_Facts.findFirst({
            where: {
                id: +id //<-- needs to be an integer to look into DB (string in API parameter)
            },
            select: {
                coffee_facts: true
            }
        })
        if(singleFact) {
            return singleFact
        } 
        throw new ErrorNotFound()
    }
    static async approvedCoffeeFacts(fact:string, adminId: number) {
        const adminUser = await coffee_Facts.findUnique({
            where: {
                id: adminId,
            }
        })

        const approvedCoffeeFact = await coffee_Facts.create({
            data: {
                coffee_facts: fact,
                admin_id: adminId
            },
            select: {
                coffee_facts: true
            }
        })
        
        if(adminUser){
            return approvedCoffeeFact
        }
        throw new ErrorNotAuthorized() //fix on how to apply this properly.
    }
}

export default Coffee