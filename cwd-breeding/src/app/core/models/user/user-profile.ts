import { Roles } from "../../constants/roles.enum";
import { BaseDataModel } from "../base-model";

export interface UserProfile extends BaseDataModel {
    uid: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    role: Roles;
}