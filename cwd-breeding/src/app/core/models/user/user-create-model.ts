import { Roles } from "../../constants/roles.enum";

export interface UserCreateModel {
    name: string;
    email: string;
    password: string;
    phoneNumber: string | null;
    role: Roles;
}
