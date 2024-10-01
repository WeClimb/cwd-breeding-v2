import { DeerFormModel } from './deer-form-model';
import { FormControl } from "@angular/forms";

export interface DoeFormModel extends DeerFormModel {
    embryosAvailable: FormControl<boolean>;
    embryosCost: FormControl<number>;
}
