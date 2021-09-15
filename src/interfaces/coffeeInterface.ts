export interface CoffeeInterface {
    getAllFacts(): Promise<{ coffee_facts: string; }[]>
    getSingleFact(id:string): Promise<{ coffee_facts: string; } | null>
    createCoffeeFacts(fact:string, adminId: number): Promise<any>
}