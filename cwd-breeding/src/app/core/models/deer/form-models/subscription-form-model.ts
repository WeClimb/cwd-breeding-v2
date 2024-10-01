import { FormControl } from "@angular/forms";

export interface SubscriptionFormModel {
    subscriptionStatus: FormControl<boolean>;
    createdData: FormControl<Date>;
    updatedData: FormControl<Date>;
    subscriptionBaseCost: FormControl<number>;
    subscriptionActualCost: FormControl<number>;
    subscriptionStartDate: FormControl<Date>;
    subscriptionEndDate: FormControl<Date>;
    promoCode: FormControl<string>;
}
