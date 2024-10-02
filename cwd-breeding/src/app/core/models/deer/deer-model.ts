import { Sex } from "../../constants/sex.enum";
import { BaseDataModel } from "../base-model";
import { DenialModel } from "./denial-model";
import { DeerImage } from "./deer-image";
import { SubscriptionModel } from "./subscription-model";
import { LineageModel } from "./lineage-model";

export type DeerImages = [] | [DeerImage] | [DeerImage, DeerImage] | [DeerImage, DeerImage, DeerImage];

export interface DeerModel extends BaseDataModel {
    name: string;
    profileImageData: DeerImage
    nadr: string;  
    dob: Date;
    age: number; 
    gebv: number;
    codon: string;
    ranchId: string;
    videoLink: string;
    description: string;
    sex: Sex;
    denialReason: DenialModel | null;
    images: DeerImages;
    subsciptionHistory: SubscriptionModel[];
    lineage: LineageModel
}