export interface CoffeeMeInterface {
    getAllFacts(): Promise<{ coffee_facts: string; }[]>
    getSingleFact(id:string): Promise<{ coffee_facts: string; } | null>
    approvedCoffeeFacts(fact:string, adminId: number): Promise<any>
}

export interface ReviewFactsInterface {
    getAllReviews(): Promise<{review_facts: string;}[]>
    getSingleReview(id:string): Promise<{ review_facts: string; } | null>
    createCoffeeFact(fact:string): Promise<any>
}