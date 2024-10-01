import { FormControl } from "@angular/forms";

export interface DenialFormModel {
    deniedDate: FormControl<Date>;
    userId: FormControl<string>;
    reason: FormControl<string>;
}
