import { FormControl } from "@angular/forms";

export interface DeerImageFormModel {
    imageURL: FormControl<string>;
    ageOfDeer: FormControl<number>;
}
