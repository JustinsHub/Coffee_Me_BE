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

    static async getSingleFact(id:string) {
        const singleFact = await coffee_Facts.findFirst({
            where: {
                id: parseInt(id) //<-- needs to be an integer to look into DB (string in API parameter)
            },
            select: {
                coffee_facts: true
                
            }
        })
        return singleFact
    }
}

export default Coffee