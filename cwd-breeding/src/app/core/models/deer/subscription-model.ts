
export interface SubscriptionModel {
    subscriptionStatus: boolean;
    createdData: Date;
    updatedData: Date;
    subscriptionBaseCost: number;
    subscriptionActualCost: number;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    promoCode: string;
}
