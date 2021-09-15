import { PrismaClient } from ".prisma/client"
import { CoffeeInterface } from "../interfaces/coffeeInterface"
import { ErrorNotAuthorized, ErrorNotFound } from "../expressErrors"

const { coffee_Facts } = new PrismaClient()

const Coffee: CoffeeInterface = class {

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
    static async createCoffeeFacts(fact:string, adminId: number) {
        const adminUser = await coffee_Facts.findUnique({
            where: {
                id: adminId,
            }
        })

        const newCoffeeFact = await coffee_Facts.create({
            data: {
                coffee_facts: fact,
                admin_id: adminId
            }
        })
        
        if(adminUser){
            return newCoffeeFact
        }
        throw new ErrorNotAuthorized()
    }
}

export default Coffee