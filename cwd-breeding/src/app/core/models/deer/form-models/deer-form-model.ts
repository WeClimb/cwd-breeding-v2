import { FormControl } from "@angular/forms";
import { Sex } from "../../../constants/sex.enum";

export interface DeerFormModel {
    name: FormControl<string>;
    nadr: FormControl<string>;
    dob: FormControl<Date>;
    age: FormControl<number>;
    gebv: FormControl<number>;
    codon: FormControl<string>;
    ranchId: FormControl<string>;
    videoLink: FormControl<string>;
    description: FormControl<string>;
    sex: FormControl<Sex>;
}
