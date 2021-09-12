import { PrismaClient } from ".prisma/client"

const { coffee_Facts } = new PrismaClient()

class Coffee {
    static async getAllFacts() {
        const allCoffeeFacts = await coffee_Facts.findMany({
            select: {
                coffee_facts: true
            }
        })
        return allCoffeeFacts
    }

    static async getSingleFact(id:number) {
        return "world"
    }
}


export default Coffee