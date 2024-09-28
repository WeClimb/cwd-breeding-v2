import { UserStatus } from "../constants/user-status.enum";

export interface BaseDataModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: UserStatus;
}
  