import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

// Define the typed interface for the form
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  phoneNumber: FormControl<string>;
}

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  @Output() formSubmitted = new EventEmitter<any>();

  // Typed FormGroup using the interface
  userForm: FormGroup<UserForm>;

  constructor(private fb: NonNullableFormBuilder) {
    this.userForm = this.fb.group<UserForm>({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      phoneNumber: this.fb.control(''),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.formSubmitted.emit(this.userForm.getRawValue()); // Get typed form values
    }
  }
}
