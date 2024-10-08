import { AlertType } from "../../core/constants/alert-type.enum";

export interface AlertModel {
    title: string;
    message: string;
    type: AlertType;
}
