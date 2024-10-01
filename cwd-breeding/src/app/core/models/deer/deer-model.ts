import { BaseDataModel } from "../base-model";
import { SubscriptionModel } from "./subscription-model";

export interface DeerModel extends BaseDataModel {
    name: string;  
    nadr: string;  
    dob: Date;
    age: number; 
    gebv: number;
    codon: string;
    sciScore: number;
    isApproved: boolean;
    isPaid: boolean;
    paidDate?: Date;
    semenAvailable: boolean;
    semenCost?: number;
    ranchId: string;
    profileImage?: string;
    videoLink?: string;
    denialReason?: string;
    ageOfBuckDisplayed?: number;
    description?: string;
    sex: 'buck' | 'doe';
    embryosAvailable: boolean;
    embryosCost?: number;
    subsciptionHistory: SubscriptionModel[];
}
