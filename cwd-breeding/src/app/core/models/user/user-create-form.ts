import { FormControl } from "@angular/forms";
import { Roles } from "../../constants/roles.enum";

export interface UserCreateForm {
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    phoneNumber: FormControl<string>;
    role: FormControl<Roles>;
  }
  