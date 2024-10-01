import { DeerFormModel } from './deer-form-model';
import { FormControl } from "@angular/forms";

export interface BuckFormModel extends DeerFormModel {
    sciScore: FormControl<number>;
    semenAvailable: FormControl<boolean>;
    semenCost: FormControl<number>;
}
