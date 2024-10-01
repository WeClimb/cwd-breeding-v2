import { DeerModel } from "./deer-model";

export interface BuckModel extends DeerModel {
    sciScore: number;
    semenAvailable: boolean;
    semenCost: number;
}
