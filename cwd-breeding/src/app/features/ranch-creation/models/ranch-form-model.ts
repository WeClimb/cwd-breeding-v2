import { FormControl } from "@angular/forms";
import { SocialsModel } from "../../../core/models/ranch/socials-model";

export interface RanchFormModel {
    name: FormControl<string>;
    ownerName: FormControl<string>;
    website: FormControl<string>;
    address: FormControl<string>;
    city: FormControl<string>;
    state: FormControl<string>;
    zipcode: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    stripeId: FormControl<string>;
    userId: FormControl<string>;
    deer: FormControl<string[]>;
    ranchProfileDescription: FormControl<string>;
    socials: FormControl<SocialsModel | null>;
    coverPhoto: FormControl<string>;
    profileImage: FormControl<string>;
}
