export interface CoffeeMeInterface {
    getAllFacts(): Promise<{ coffee_facts: string; }[]>
    getSingleFact(id:string): Promise<{ coffee_facts: string; } | null>
    approvedCoffeeFacts(fact:string, adminId: number): Promise<any>
}

export interface ReviewFactsInterface {
    getAllReviews(): Promise<{review_facts: string;}[]>
    getSingleReview(id:number): Promise<{ review_facts: string; } | null>
    createCoffeeFact(fact:string): Promise<any>
    updateReviewFact(id:number, data:any): Promise<any>
}

export interface RejectedFactsInterface {
    getAllRejectedFacts(): Promise<{rejected_facts: string;}[]>
    getSingleRejectedFact(id:string): Promise<{ rejected_facts: string; } | null>
    rejectedCoffeeFact(fact:string, adminId: number): Promise<any>
}