import { BaseDataModel } from "../base-model";

export interface RanchModel extends BaseDataModel {
    name: string;
    ownerFirstName: string;
    ownerLastName: string;
    website: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
    stripeId: string | null;
}