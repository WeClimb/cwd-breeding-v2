import { BaseDataModel } from "../base-model";
import { SocialsModel } from "./socials-model";

export interface RanchModel extends BaseDataModel {
    name: string;
    ownerName: string;
    website: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
    stripeId: string | null;
    userId: string;
    deer: string[];
    ranchProfileDescription: string;
    socials: SocialsModel;
    coverPhoto: string;
    profileImage: string;
}