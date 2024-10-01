import { Status } from "../constants/status.enum";

export interface BaseDataModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: Status;
}