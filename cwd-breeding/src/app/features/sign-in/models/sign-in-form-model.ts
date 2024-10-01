import { FormControl } from '@angular/forms';

export interface SignInFormModel {
  email: FormControl<string>;
  password: FormControl<string>;
}
