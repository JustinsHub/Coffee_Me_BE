export interface CoffeeInterface {
    getAllFacts(): Promise<string[]>
    getSingleFact(): Promise<string>
}