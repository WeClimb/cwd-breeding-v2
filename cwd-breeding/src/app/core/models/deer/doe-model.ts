import { DeerModel } from "./deer-model";

export interface DoeModel extends DeerModel {
    embryosAvailable: boolean;
    embryosCost: number;
}
